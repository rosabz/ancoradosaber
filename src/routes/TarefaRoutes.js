const express = require("express");
const TarefaController = require("../controllers/TarefaController");

const router = express.Router();
const controller = new TarefaController();

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma tarefa
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - disciplinaId
 *               - usuarioId
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Estudar matemática
 *               descricao:
 *                 type: string
 *                 example: Revisar equações do segundo grau
 *               status:
 *                 type: string
 *                 example: pendente
 *               dataEntrega:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-01T18:00:00"
 *               disciplinaId:
 *                 type: integer
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags:
 *       - Tarefas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get("/", (req, res) => controller.listarTodos(req, res));

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags:
 *       - Tarefas
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
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/:id", (req, res) => controller.buscarPorId(req, res));

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags:
 *       - Tarefas
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
 *               titulo:
 *                 type: string
 *                 example: Estudar matemática
 *               descricao:
 *                 type: string
 *                 example: Revisar equações
 *               status:
 *                 type: string
 *                 example: concluida
 *               dataEntrega:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */
router.put("/:id", (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags:
 *       - Tarefas
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
 *         description: Tarefa excluída
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete("/:id", (req, res) => controller.excluir(req, res));

module.exports = router;