const usuarioController = {
    index: async (req, res) => {
        try {
            res.sendFile('index.html');
        } catch (error) {
            res.send("Erro ao acessar a página:" + error);
        }
    }
}

module.exports = { usuarioController};