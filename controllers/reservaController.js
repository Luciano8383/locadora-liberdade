const { modelReserva } = require("../models/modelreserva"); // Importa o modelo de reserva
const {modelVeiculo} = require('../models/modelVeiculo');
const {modelClientes} = require('../models/modelClientes');

const reservaController = {
    // Controller para coleta e envio de dados
    // Este método lida com requisições GET e tem como objetivo listar todas as reservas.
    listarReservas: async (req, res) => {
        try {
            // Utiliza o método 'findAll()' do Sequelize para buscar todas as reservas.
            const reservas = await modelReserva.findAll({
                include: [{
                    model: modelVeiculo,
                    as: 'Veiculo'
                }, {
                    model: modelClientes,
                    as: 'Cliente'
                }]
            });
            // Envia os dados encontrados (reservas) para o cliente em formato JSON.
            res.send(reservas);
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para criação de reserva
    // Este método lida com requisições POST e tem como objetivo criar uma nova reserva.
    criarReserva: async (req, res) => {
        try {
            // Extrai os dados da requisição para criação da nova reserva.
            const { data_reserva, data_inicio, data_fim, status_reserva, id_veiculo_reserva, id_cliente_reserva } = req.body;

            // O método 'create()' do Sequelize é usado para inserir uma nova reserva no banco de dados.
            await modelReserva.create({ data_reserva, data_inicio, data_fim, status_reserva, id_veiculo_reserva, id_cliente_reserva });

            // Após a criação, o cliente é redirecionado para a rota '/listarReservas' para ver a lista atualizada de reservas.
            res.redirect("/listarReserva");
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para edição de reserva
    // Este método lida com requisições PUT e tem como objetivo editar uma reserva existente.
    editarReserva: async (req, res) => {
        try {
            // Extrai o 'id_reserva' dos parâmetros da URL e os dados da reserva a serem atualizados do corpo da requisição.
            const { id_reserva } = req.params;
            const { data_reserva, data_inicio, data_fim, status_reserva, id_veiculo_reserva, id_cliente_reserva } = req.body;

            // Busca a reserva correspondente ao 'id_reserva' fornecido.
            const reserva = await modelReserva.findByPk(id_reserva);

            // Se a reserva não for encontrada, retorna uma mensagem de erro 404 (não encontrado).
            if (!reserva) {
                return res.status(404).send("Reserva não encontrada!");
            }

            // Atualiza os dados da reserva no banco de dados com o método 'update()' do Sequelize.
            await modelReserva.update(
                { data_reserva, data_inicio, data_fim, status_reserva, id_veiculo_reserva, id_cliente_reserva },
                { where: { id_reserva } }
            );

            // Enviando um JSON como resposta para confirmar a atualização
            res.status(200).json({ message: "Reserva atualizada com sucesso!" });
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para exclusão de reserva
    // Este método lida com requisições DELETE e tem como objetivo excluir uma reserva existente.
    deletarReserva: async (req, res) => {
        try {
            // Extrai o 'id_reserva' dos parâmetros da URL.
            const { id_reserva } = req.params;

            // Busca a reserva correspondente ao 'id_reserva' fornecido.
            const reserva = await modelReserva.findByPk(id_reserva);

            // Se a reserva não for encontrada, retorna uma mensagem de erro 404 (não encontrado).
            if (!reserva) {
                return res.status(404).send("Reserva não encontrada!");
            }

            // O método 'destroy()' do Sequelize é usado para excluir a reserva do banco de dados.
            const result = await modelReserva.destroy({
                where: { id_reserva },
            });

            if (result > 0) {
                // Enviando um JSON como resposta para confirmar a exclusão
                return res
                    .status(200)
                    .json({ message: "Reserva excluída com sucesso!" });
            } else {
                // Se por algum motivo a reserva não for excluída, retorna uma mensagem de erro.
                return res.status(404).send("Erro ao excluir Reserva!");
            }
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    }
};

// Exporta o controller para que possa ser utilizado em outros arquivos.
module.exports = { reservaController };