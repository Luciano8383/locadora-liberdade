const express = require('express');
const router = express.Router();

const {clienteController} = require("../controllers/clienteController");

router.get("/listarCliente", clienteController.listarClientes);
router.post("/criarCliente", clienteController.criarCliente);
router.put("/atualizarCliente/:id_cliente", clienteController.editarCliente);
router.delete("/deletarCliente/:id_cliente", clienteController.deletarCliente);


module.exports =  router;