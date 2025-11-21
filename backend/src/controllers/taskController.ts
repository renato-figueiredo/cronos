import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export class TaskController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = {
                userId: req.query.userId as string,
                projectId: req.query.projectId as string,
                status: req.query.status as string,
            };
            const tasks = await taskService.getAllTasks(filters);
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await taskService.getTaskById(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await taskService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await taskService.deleteTask(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async startTimer(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await taskService.startTimer(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    async stopTimer(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await taskService.stopTimer(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }
}
