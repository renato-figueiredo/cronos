import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();
const taskController = new TaskController();

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Gerenciamento de tarefas e cronômetro
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: string
 *               projectId:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Usuário ou Projeto não encontrado
 */
router.post('/', taskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista tarefas com filtros opcionais
 *     tags: [Tarefas]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filtrar por ID do usuário
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         description: Filtrar por ID do projeto
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por status (pending, completed)
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get('/', taskController.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Detalhes da tarefa
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/:id', taskController.getOne);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/:id', taskController.delete);

/**
 * @swagger
 * /tasks/{id}/start:
 *   post:
 *     summary: Inicia o cronômetro da tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Cronômetro iniciado
 *       400:
 *         description: Cronômetro já está rodando
 *       404:
 *         description: Tarefa não encontrada
 */
router.post('/:id/start', taskController.startTimer);

/**
 * @swagger
 * /tasks/{id}/stop:
 *   post:
 *     summary: Para o cronômetro da tarefa e atualiza a duração
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Cronômetro parado
 *       400:
 *         description: Cronômetro não estava rodando
 *       404:
 *         description: Tarefa não encontrada
 */
router.post('/:id/stop', taskController.stopTimer);

export default router;
