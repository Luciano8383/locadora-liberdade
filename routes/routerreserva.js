const express = require('express');
const router = express.Router();

const {reservaController} = require("../controllers/reservaController");
router.get("/listarReserva", reservaController.listarReservas);
router.post("/criarReserva", reservaController.criarReserva);
router.put("/atualizarReserva/:id_reserva", reservaController.editarReserva);
router.delete("/deletarReserva/:id_reserva", reservaController.deletarReserva);


module.exports =  router;