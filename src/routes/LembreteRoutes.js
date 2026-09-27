const express = require("express");
const LembreteController = require("../controllers/LembreteController");

const router = express.Router();
const controller = new LembreteController();

/**
 * @swagger
 * /lembretes:
 *   post:
 *     summary: Cria um lembrete
 *     tags:
 *       - Lembretes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - dataHora
 *               - usuarioId
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Estudar para a prova
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-01T19:00:00"
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Lembrete criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /lembretes:
 *   get:
 *     summary: Lista todos os lembretes
 *     tags:
 *       - Lembretes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lembretes
 */
router.get("/", (req, res) => controller.listarTodos(req, res));

/**
 * @swagger
 * /lembretes/{id}:
 *   get:
 *     summary: Busca um lembrete pelo ID
 *     tags:
 *       - Lembretes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lembrete encontrado
 *       404:
 *         description: Lembrete não encontrado
 */
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

/**
 * @swagger
 * /lembretes/{id}:
 *   put:
 *     summary: Atualiza um lembrete
 *     tags:
 *       - Lembretes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Estudar para a prova
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-02T19:00:00"
 *     responses:
 *       200:
 *         description: Lembrete atualizado
 *       404:
 *         description: Lembrete não encontrado
 */
router.put("/:id", (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /lembretes/{id}:
 *   delete:
 *     summary: Exclui um lembrete
 *     tags:
 *       - Lembretes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lembrete excluído
 *       404:
 *         description: Lembrete não encontrado
 */
router.delete("/:id", (req, res) => controller.excluir(req, res));

module.exports = router;