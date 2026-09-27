const express = require("express");
const DisciplinaController = require("../controllers/DisciplinaController");

const router = express.Router();
const controller = new DisciplinaController();

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Cria uma disciplina
 *     tags:
 *       - Disciplinas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - usuarioId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matemática
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Lista todas as disciplinas
 *     tags:
 *       - Disciplinas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de disciplinas
 */
router.get("/", (req, res) => controller.listarTodos(req, res));

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualiza uma disciplina
 *     tags:
 *       - Disciplinas
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
 *               nome:
 *                 type: string
 *                 example: Matemática
 *     responses:
 *       200:
 *         description: Disciplina atualizada
 *       404:
 *         description: Disciplina não encontrada
 */
router.put("/:id", (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Exclui uma disciplina
 *     tags:
 *       - Disciplinas
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
 *         description: Disciplina excluída
 *       404:
 *         description: Disciplina não encontrada
 */
router.delete("/:id", (req, res) => controller.excluir(req, res));

module.exports = router;