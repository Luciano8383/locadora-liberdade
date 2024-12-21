const {modelManutencao} = require('../models/modelManutencao'); // Importa o modelo de manutenção

const manutencaoController = {
    // Controller para coleta e envio de dados
    // Este método lida com requisições GET e tem como objetivo listar todas as manutenções.
    listarManutencao: async (req, res) => {
        try {
            // Utiliza o método 'findAll()' do Sequelize para buscar todas as manutenções.
            const manutencoes = await modelManutencao.findAll();
            // Envia os dados encontrados (manutenções) para o cliente em formato JSON.
            res.send(manutencoes);
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para criação de manutenção
    // Este método lida com requisições POST e tem como objetivo criar uma nova manutenção.
    criarManutencao: async (req, res) => {
        try {
            // Extrai os dados da requisição para criação da nova manutenção.
            const { data, tipo, custo, id_veiculo } = req.body;

            // O método 'create()' do Sequelize é usado para inserir uma nova manutenção no banco de dados.
            await modelManutencao.create({ data, tipo, custo, id_veiculo });

            // Após a criação, o cliente é redirecionado para a rota '/listarManutencoes' para ver a lista atualizada de manutenções.
            res.redirect("/listarManutencoes");
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para edição de manutenção
    // Este método lida com requisições PUT e tem como objetivo editar uma manutenção existente.
    editarManutencao: async (req, res) => {
        try {
            // Extrai o 'id_manutencao' dos parâmetros da URL e os dados da manutenção a serem atualizados do corpo da requisição.
            const { id_manutencao } = req.params;
            const { data, tipo, custo, id_veiculo } = req.body;

            // Busca a manutenção correspondente ao 'id_manutencao' fornecido.
            const manutencao = await modelManutencao.findByPk(id_manutencao);

            // Se a manutenção não for encontrada, retorna uma mensagem de erro 404 (não encontrado).
            if (!manutencao) {
                return res.status(404).send("Manutenção não encontrada!");
            }

            // Atualiza os dados da manutenção no banco de dados com o método 'update()' do Sequelize.
            await modelManutencao.update(
                { data, tipo, custo, id_veiculo },
                { where: { id_manutencao } }
            );

            // Enviando um JSON como resposta para confirmar a atualização
            res.status(200).json({ message: "Manutenção atualizada com sucesso!" });
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para exclusão de manutenção
    // Este método lida com requisições DELETE e tem como objetivo excluir uma manutenção existente.
    deletarManutencao: async (req, res) => {
        try {
            // Extrai o 'id_manutencao' dos parâmetros da URL.
            const { id_manutencao } = req.params;

            // Busca a manutenção correspondente ao 'id_manutencao' fornecido.
            const manutencao = await modelManutencao.findByPk(id_manutencao);

            // Se a manutenção não for encontrada, retorna uma mensagem de erro 404 (não encontrado).
            if (!manutencao) {
                return res.status(404).send("Manutenção não encontrada!");
            }

            // O método 'destroy()' do Sequelize é usado para excluir a manutenção do banco de dados.
            const result = await modelManutencao.destroy({
                where: { id_manutencao },
            });

            if (result > 0) {
                // Enviando um JSON como resposta para confirmar a exclusão
                return res
                    .status(200)
                    .json({ message: "Manutenção excluída com sucesso!" });
            } else {
                // Se por algum motivo a manutenção não for excluída, retorna uma mensagem de erro.
                return res.status(404).render("Erro ao excluir Manutenção!");
            }
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    }
};

  // Exporta o controller para que possa ser utilizado em outros arquivos.
  module.exports = { manutencaoController };