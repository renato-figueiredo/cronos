import { PrismaClient, Project } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export class ProjectService {
    async createProject(data: { name: string; description?: string; userId: string }): Promise<Project> {
        // Verify if user exists
        const user = await prisma.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const project = await prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                userId: data.userId,
            },
        });

        return project;
    }

    async getProjectById(id: string): Promise<Project> {
        const project = await prisma.project.findUnique({
            where: { id },
            include: { user: { select: { id: true, name: true, email: true } } }, // Include basic user info
        });

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        return project;
    }

    async getAllProjects(): Promise<Project[]> {
        return await prisma.project.findMany({
            include: { user: { select: { id: true, name: true, email: true } } },
        });
    }

    async updateProject(id: string, data: Partial<Project>): Promise<Project> {
        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        return await prisma.project.update({
            where: { id },
            data,
        });
    }

    async deleteProject(id: string): Promise<void> {
        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        await prisma.project.delete({ where: { id } });
    }
}
