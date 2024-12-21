const {modelFuncionario} = require("../models/modelFuncionario"); // Importa o modelo de funcionário

const funcionarioController = {
    // Controller para coleta e envio de dados
    // Este método lida com requisições GET e tem como objetivo listar todos os funcionários.
    listarFuncionario: async (req, res) => {
        try {
            // Utiliza o método 'findAll()' do Sequelize para buscar todos os funcionários.
            const funcionarios = await modelFuncionario.findAll();
            // Envia os dados encontrados (funcionários) para o cliente em formato JSON.
            res.send(funcionarios);
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para criação de funcionário
    // Este método lida com requisições POST e tem como objetivo criar um novo funcionário.
    criarFuncionario: async (req, res) => {
        try {
            // Extrai os dados da requisição para criação do novo funcionário.
            const { nome_funcionario, cpf_funcionario, tel_funcionario, email, senha, privilegio_funcionario } = req.body;

            // O método 'create()' do Sequelize é usado para inserir um novo funcionário no banco de dados.
            await modelFuncionario.create({ nome_funcionario, cpf_funcionario, tel_funcionario, email, senha, privilegio_funcionario });

            // Após a criação, o cliente é redirecionado para a rota '/listarFuncionarios' para ver a lista atualizada de funcionários.
            res.redirect("/listarFuncionario");
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para edição de funcionários
    // Este método lida com requisições PUT e tem como objetivo editar um funcionário existente.
    editarFuncionario: async (req, res) => {
        try {
            // Extrai o 'id_funcionario' dos parâmetros da URL e os dados do funcionário a serem atualizados do corpo da requisição.
            const { id_funcionario } = req.params;
            const { nome_funcionario, cpf_funcionario, tel_funcionario, email, senha, privilegio_funcionario } = req.body;

            // Busca o funcionário correspondente ao 'id_funcionario' fornecido.
            const funcionario = await modelFuncionario.findByPk(id_funcionario);

            // Se o funcionário não for encontrado, retorna uma mensagem de erro 404 (não encontrado).
            if (!funcionario) {
                return res.status(404).send("Funcionário não encontrado!");
            }

            // Atualiza os dados do funcionário no banco de dados com o método 'update()' do Sequelize.
            await modelFuncionario.update(
                { nome_funcionario, cpf_funcionario, tel_funcionario, email, senha, privilegio_funcionario },
                { where: { id_funcionario } }
            );

            // Enviando um JSON como resposta para confirmar a atualização
            res.status(200).json({ message: "Funcionário atualizado com sucesso!" });
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para exclusão de funcionários
    // Este método lida com requisições DELETE e tem como objetivo excluir um funcionário existente.
    deletarFuncionario: async (req, res) => {
        try {
            // Extrai o 'id_funcionario' dos parâmetros da URL.
            const { id_funcionario } = req.params;

            // Busca o funcionário correspondente ao 'id_funcionario' fornecido.
            const funcionario = await modelFuncionario.findByPk(id_funcionario);

            // Se o funcionário não for encontrado, retorna uma mensagem de erro 404 (não encontrado).
            if (!funcionario) {
                return res.status(404).send("Funcionário não encontrado!");
            }

            // O método 'destroy()' do Sequelize é usado para excluir o funcionário do banco de dados.
            const result = await modelFuncionario.destroy({
                where: { id_funcionario },
            });

            if (result > 0) {
                // Enviando um JSON como resposta para confirmar a exclusão
                return res
                    .status(200)
                    .json({ message: "Funcionário excluído com sucesso!" });
            } else {
                // Se por algum motivo o funcionário não for excluído, retorna uma mensagem de erro.
                return res.status(404).render("Erro ao excluir Funcionário!");
            }
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    }
};

 // Exporta o controller para que possa ser utilizado em outros arquivos.
 module.exports = { funcionarioController }