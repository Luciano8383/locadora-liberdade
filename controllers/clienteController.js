const { modelClientes } = require("../models/modelClientes"); // Importa o modelo de clientes

const clienteController = {
    // Controller para coleta e envio de dados
    // Este método lida com requisições GET e tem como objetivo listar todos os clientes.
    listarClientes: async (req, res) => {
        try {
            // Utiliza o método 'findAll()' do Sequelize para buscar todos os clientes.
            const clientes = await modelClientes.findAll();
            // Envia os dados encontrados (clientes) para o cliente em formato JSON.
            res.send(clientes);
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página:" + error);
        }
    },

    // Controller para criação de cliente
    // Este método lida com requisições POST e tem como objetivo criar uma novo cliente.
    criarCliente: async (req, res) => {
        try {
            // Extrai os dados da requisição para criação do novo cliente.
            const { nome, cpf, tel, email, senha, endereco, profissao } = req.body;

            // O método 'create()' do Sequelize é usado para inserir um novo cliente no banco de dados.
            await modelClientes.create({ nome, cpf, tel, email, senha, endereco, profissao });

            // Após a criação, o cliente é redirecionado para a rota '/listarClientes' para ver a lista atualizada de clientes.
            res.redirect("/listarCliente");
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página:" + error);
        }
    },

    // Controller para edição de clientes
    // Este método lida com requisições PUT e tem como objetivo editar um cliente existente.
    // A rota com método PUT e DELETE encontra certas limitações, como são usadas para enviar dados ao servidor não é possível que elas redirecionem automáticamente para outras rotas.
    editarCliente: async (req, res) => {
        try {
            // Extrai o 'id_equipe' dos parâmetros da URL e os dados da equipe a serem atualizados do corpo da requisição.
            const { id_cliente } = req.params;
            const { nome, cpf, tel, email, senha, endereco, profissao } = req.body;

            // Busca a equipe correspondente ao 'id_equipe' fornecido.
            const clientes = await modelClientes.findByPk(id_cliente);

            // Se a equipe não for encontrada, retorna uma mensagem de erro 404 (não encontrado).
            if (!clientes) {
                return res.status(404).send("Cliente não encontrado!");
            }

            // Atualiza os dados da equipe no banco de dados com o método 'update()' do Sequelize.
            await modelClientes.update(
                { nome, cpf, tel, email, senha, endereco, profissao },
                { where: { id_cliente } }
            );

            // Enviando um JSON como resposta para confirmar a atualização
            res.status(200).json({ message: "Cliente atualizado com sucesso!" });
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página:" + error);
        }
    },

    // Controller para exclusão de equipes
    // Este método lida com requisições DELETE e tem como objetivo excluir uma equipe existente de F1.
    deletarCliente: async (req, res) => {
        try {
            // Extrai o 'id_equipe' dos parâmetros da URL.
            const { id_cliente } = req.params;

            // Busca a equipe correspondente ao 'id_equipe' fornecido.
            const clientes = await modelClientes.findByPk(id_cliente);

            // Se a equipe não for encontrada, retorna uma mensagem de erro 404 (não encontrado).
            if (!clientes) {
                return res.status(404).send("Cliente não encontrado!");
            }

            // O método 'destroy()' do Sequelize é usado para excluir a equipe do banco de dados.
            const result = await modelClientes.destroy({
                where: { id_cliente },
            });

            if (result > 0) {
                // Enviando um JSON como resposta para confirmar a exclusão
                return res
                    .status(200)
                    .json({ message: "Cliente excluído com sucesso!" });
            } else {
                // Se por algum motivo o cliente não for excluído, retorna uma mensagem de erro.
                return res.status(404).render("Erro ao excluir Cliente!");
            }
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página:" + error);
        }
    }
};

// Exporta o controller para que possa ser utilizado em outros arquivos.
module.exports = { clienteController };