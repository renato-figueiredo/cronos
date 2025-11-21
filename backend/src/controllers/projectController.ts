import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/projectService';

const projectService = new ProjectService();

export class ProjectController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const project = await projectService.createProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await projectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const project = await projectService.getProjectById(req.params.id);
            res.status(200).json(project);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const project = await projectService.updateProject(req.params.id, req.body);
            res.status(200).json(project);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await projectService.deleteProject(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
