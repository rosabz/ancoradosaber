const express = require("express");
const MetaController = require("../controllers/MetaController");

const router = express.Router();
const controller = new MetaController();

/**
 * @swagger
 * /metas:
 *   post:
 *     summary: Cria uma meta
 *     tags:
 *       - Metas
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
 *               - usuarioId
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Estudar 2 horas por dia
 *               percentual:
 *                 type: number
 *                 example: 50
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Meta criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /metas:
 *   get:
 *     summary: Lista todas as metas
 *     tags:
 *       - Metas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de metas
 */
router.get("/", (req, res) => controller.listarTodos(req, res));

/**
 * @swagger
 * /metas/{id}:
 *   get:
 *     summary: Busca uma meta pelo ID
 *     tags:
 *       - Metas
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
 *         description: Meta encontrada
 *       404:
 *         description: Meta não encontrada
 */
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

/**
 * @swagger
 * /metas/{id}:
 *   put:
 *     summary: Atualiza uma meta
 *     tags:
 *       - Metas
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
 *                 example: Estudar 3 horas por dia
 *               percentual:
 *                 type: number
 *                 example: 75
 *     responses:
 *       200:
 *         description: Meta atualizada
 *       404:
 *         description: Meta não encontrada
 */
router.put("/:id", (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /metas/{id}:
 *   delete:
 *     summary: Exclui uma meta
 *     tags:
 *       - Metas
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
 *         description: Meta excluída
 *       404:
 *         description: Meta não encontrada
 */
router.delete("/:id", (req, res) => controller.excluir(req, res));

module.exports = router;