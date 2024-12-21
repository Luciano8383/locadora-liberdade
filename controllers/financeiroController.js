const {modelRelatorioFinanceiro} = require("../models/modelRelatorioFinanceiro"); // Importa o modelo de relatório financeiro

const financeiroController = {
    // Controller para coleta e envio de dados
    // Este método lida com requisições GET e tem como objetivo listar todos os relatórios financeiros.
    listarRelatorioFinanceiro: async (req, res) => {
        try {
            // Utiliza o método 'findAll()' do Sequelize para buscar todos os relatórios financeiros.
            const relatorios = await modelRelatorioFinanceiro.findAll();
            // Envia os dados encontrados (relatórios) para o cliente em formato JSON.
            res.send(relatorios);
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para criação de relatório financeiro
    // Este método lida com requisições POST e tem como objetivo criar um novo relatório financeiro.
    criarRelatorioFinanceiro: async (req, res) => {
        try {
            // Extrai os dados da requisição para criação do novo relatório financeiro.
            const { data, ganhos, categoria, id_reserva } = req.body;

            // O método 'create()' do Sequelize é usado para inserir um novo relatório financeiro no banco de dados.
            await modelRelatorioFinanceiro.create({ data, ganhos, categoria, id_reserva });

            // Após a criação, o cliente é redirecionado para a rota '/listarRelatorios' para ver a lista atualizada de relatórios financeiros.
            res.redirect("/listarRelatorios");
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para edição de relatório financeiro
    // Este método lida com requisições PUT e tem como objetivo editar um relatório financeiro existente.
    editarRelatorioFinanceiro: async (req, res) => {
        try {
            // Extrai o 'id_relatorio' dos parâmetros da URL e os dados do relatório a serem atualizados do corpo da requisição.
            const { id_relatorio } = req.params;
            const { data, ganhos, categoria, id_reserva } = req.body;

            // Busca o relatório correspondente ao 'id_relatorio' fornecido.
            const relatorio = await modelRelatorioFinanceiro.findByPk(id_relatorio);

            // Se o relatório não for encontrado, retorna uma mensagem de erro 404 (não encontrado).
            if (!relatorio) {
                return res.status(404).send("Relatório financeiro não encontrado!");
            }

            // Atualiza os dados do relatório no banco de dados com o método 'update()' do Sequelize.
            await modelRelatorioFinanceiro.update(
                { data, ganhos, categoria, id_reserva },
                { where: { id_relatorio } }
            );

            // Enviando um JSON como resposta para confirmar a atualização
            res.status(200).json({ message: "Relatório financeiro atualizado com sucesso!" });
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },

    // Controller para exclusão de relatório financeiro
    // Este método lida com requisições DELETE e tem como objetivo excluir um relatório financeiro existente.
    deletarRelatorioFinanceiro: async (req, res) => {
        try {
            // Extrai o 'id_relatorio' dos parâmetros da URL.
            const { id_relatorio } = req.params;

            // Busca o relatório correspondente ao 'id_relatorio' fornecido.
            const relatorio = await modelRelatorioFinanceiro.findByPk(id_relatorio);

            // Se o relatório não for encontrado, retorna uma mensagem de erro 404 (não encontrado).
            if (!relatorio) {
                return res.status(404).send("Relatório financeiro não encontrado!");
            }

            // O método 'destroy()' do Sequelize é usado para excluir o relatório financeiro do banco de dados.
            const result = await modelRelatorioFinanceiro.destroy({
                where: { id_relatorio },
            });

            if (result > 0) {
                // Enviando um JSON como resposta para confirmar a exclusão
                return res
                    .status(200)
                    .json({ message: "Relatório financeiro excluído com sucesso!" });
            } else {
                // Se por algum motivo o relatório não for excluído, retorna uma mensagem de erro.
                return res.status(404).render("Erro ao excluir Relatório Financeiro!");
            }
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    }
};

  // Exporta o controller para que possa ser utilizado em outros arquivos.
  module.exports = { financeiroController };