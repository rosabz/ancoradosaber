const express = require("express");
const RegistroEstudoController = require("../controllers/RegistroEstudoController");

const router = express.Router();
const controller = new RegistroEstudoController();

/**
 * @swagger
 * /registro-estudo:
 *   post:
 *     summary: Cria um registro de estudo
 *     tags:
 *       - Registros de estudo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - metaId
 *               - dataEstudo
 *               - horasEstudadas
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *               metaId:
 *                 type: integer
 *                 example: 1
 *               dataEstudo:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-26"
 *               horasEstudadas:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /registro-estudo:
 *   get:
 *     summary: Lista todos os registros de estudo
 *     tags:
 *       - Registros de estudo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get("/", (req, res) => controller.listarTodos(req, res));

/**
 * @swagger
 * /registro-estudo/{id}:
 *   get:
 *     summary: Busca um registro de estudo pelo ID
 *     tags:
 *       - Registros de estudo
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
 *         description: Registro encontrado
 *       404:
 *         description: Registro não encontrado
 */
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

/**
 * @swagger
 * /registro-estudo/{id}:
 *   put:
 *     summary: Atualiza um registro de estudo
 *     tags:
 *       - Registros de estudo
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
 *               dataEstudo:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-27"
 *               horasEstudadas:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Registro atualizado
 *       404:
 *         description: Registro não encontrado
 */
router.put("/:id", (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /registro-estudo/{id}:
 *   delete:
 *     summary: Exclui um registro de estudo
 *     tags:
 *       - Registros de estudo
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
 *         description: Registro excluído
 *       404:
 *         description: Registro não encontrado
 */
router.delete("/:id", (req, res) => controller.excluir(req, res));

module.exports = router;