const {modelVeiculo} = require("../models/modelVeiculo"); // Importa o modelo de veiculos

const veiculoController = {
    // Controller para coleta e envio de dados
    // Este método lida com requisições GET e tem como objetivo listar todos os veículos.
    listarVeiculo: async (req, res) => {
        try {
            // Utiliza o método 'findAll()' do Sequelize para buscar todos os veículos.
            const veiculos = await modelVeiculo.findAll();
            // Envia os dados encontrados (veículos) para o cliente em formato JSON.
            res.render('veiculos', {veiculos});
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },
  
    // Controller para criação de veículo
    // Este método lida com requisições POST e tem como objetivo criar um novo veículo.
    criarVeiculo: async (req, res) => {
        try {
            // Extrai os dados da requisição para criação do novo veículo.
            const { modelo_veiculo, marca_veiculo, categoria_veiculo, placa, renavam, quilometragem, ano_fabricacao, cor, combustivel, preco_diaria, status_disponibilidade, data_ultima_manutencao } = req.body;

            // O método 'create()' do Sequelize é usado para inserir um novo veículo no banco de dados.
            await modelVeiculo.create({ modelo_veiculo, marca_veiculo, categoria_veiculo, placa, renavam, quilometragem, ano_fabricacao, cor, combustivel, preco_diaria, status_disponibilidade, data_ultima_manutencao });
  
            // Após a criação, o cliente é redirecionado para a rota '/listarVeiculos' para ver a lista atualizada de veículos.
            res.redirect("/listarVeiculos");
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },
  
    // Controller para edição de veículo
    // Este método lida com requisições PUT e tem como objetivo editar um veículo existente.
    editarVeiculo: async (req, res) => {
        try {
            // Extrai o 'id_veiculo' dos parâmetros da URL e os dados do veículo a serem atualizados do corpo da requisição.
            const { id_veiculos } = req.params;
            const { modelo_veiculo, marca_veiculo, categoria_veiculo, placa, renavam, quilometragem, ano_fabricacao, cor, combustivel, preco_diaria, status_disponibilidade, data_ultima_manutencao } = req.body;
  
            // Busca o veículo correspondente ao 'id_veiculo' fornecido.
            const veiculo = await modelVeiculo.findByPk(id_veiculos);
  
            // Se o veículo não for encontrado, retorna uma mensagem de erro 404 (não encontrado).
            if (!veiculo) {
                return res.status(404).send("Veículo não encontrado!");
            }
  
            // Atualiza os dados do veículo no banco de dados com o método 'update()' do Sequelize.
            await modelVeiculo.update(
                { modelo_veiculo, marca_veiculo, categoria_veiculo, placa, renavam, quilometragem, ano_fabricacao, cor, combustivel, preco_diaria, status_disponibilidade, data_ultima_manutencao },
                { where: { id_veiculos } }
            );
  
            // Enviando um JSON como resposta para confirmar a atualização
            res.status(200).json({ message: "Veículo atualizado com sucesso!" });
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    },
  
    // Controller para exclusão de veículo
    // Este método lida com requisições DELETE e tem como objetivo excluir um veículo existente.
    deletarVeiculo: async (req, res) => {
        try {
            // Extrai o 'id_veiculo' dos parâmetros da URL.
            const { id_veiculos } = req.params;
  
            // Busca o veículo correspondente ao 'id_veiculo' fornecido.
            const veiculo = await modelVeiculo.findByPk(id_veiculos);
  
            // Se o veículo não for encontrado, retorna uma mensagem de erro 404 (não encontrado).
            if (!veiculo) {
                return res.status(404).send("Veículo não encontrado!");
            }
  
            // O método 'destroy()' do Sequelize é usado para excluir o veículo do banco de dados.
            const result = await modelVeiculo.destroy({
                where: { id_veiculos },
            });
  
            if (result > 0) {
                // Enviando um JSON como resposta para confirmar a exclusão
                return res
                    .status(200)
                    .json({ message: "Veículo excluído com sucesso!" });
            } else {
                // Se por algum motivo o veículo não for excluído, retorna uma mensagem de erro.
                return res.status(404).send("Erro ao excluir Veículo!");
            }
        } catch (error) {
            // Em caso de erro, a mensagem de erro é enviada ao cliente.
            res.send("Erro ao acessar a página: " + error);
        }
    }
  };

  module.exports = {veiculoController};