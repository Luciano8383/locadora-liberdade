const userController = {
    // Método 'index' do controller
    // Este método lida com requisições GET que têm como objetivo exibir a página inicial do site.
    index: (req, res) => {
        try {
        // O método 'sendFile' envia um arquivo HTML específico para o cliente.
        // Aqui está sendo enviado o arquivo 'index.html' da pasta raiz do projeto.
        res.sendFile(path.join(__dirname, "index.html"));
        } catch (error) {
        // Em caso de erro, a mensagem de erro é enviada ao cliente.
        res.send("Erro ao acessar a página:" + error);
        }
    }
};

 // Exporta o controller para que possa ser utilizado em outros arquivos.
module.exports = { userController, clienteController, funcionarioController, manutencaoController, financeiroController, reservaController, veiculoController};