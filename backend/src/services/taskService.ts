import { PrismaClient, Task } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export class TaskService {
    async createTask(data: {
        title: string;
        description?: string;
        projectId?: string;
        userId: string;
        priority?: string;
        dueDate?: Date;
    }): Promise<Task> {
        // Verify user
        const user = await prisma.user.findUnique({ where: { id: data.userId } });
        if (!user) throw new AppError('User not found', 404);

        // Verify project if provided
        if (data.projectId) {
            const project = await prisma.project.findUnique({ where: { id: data.projectId } });
            if (!project) throw new AppError('Project not found', 404);
        }

        return await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                projectId: data.projectId,
                userId: data.userId,
                priority: data.priority || 'medium',
                dueDate: data.dueDate,
            },
        });
    }

    async getAllTasks(filters: { userId?: string; projectId?: string; status?: string }): Promise<Task[]> {
        const where: any = {};
        if (filters.userId) where.userId = filters.userId;
        if (filters.projectId) where.projectId = filters.projectId;
        if (filters.status) where.status = filters.status;

        return await prisma.task.findMany({
            where,
            include: {
                project: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                project: { select: { id: true, name: true } },
            },
        });

        if (!task) throw new AppError('Task not found', 404);
        return task;
    }

    async updateTask(id: string, data: Partial<Task>): Promise<Task> {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new AppError('Task not found', 404);

        return await prisma.task.update({
            where: { id },
            data,
        });
    }

    async deleteTask(id: string): Promise<void> {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new AppError('Task not found', 404);

        await prisma.task.delete({ where: { id } });
    }

    // Timer Logic
    async startTimer(id: string): Promise<Task> {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new AppError('Task not found', 404);

        if (task.startTime) {
            throw new AppError('Timer already running', 400);
        }

        return await prisma.task.update({
            where: { id },
            data: { startTime: new Date() },
        });
    }

    async stopTimer(id: string): Promise<Task> {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new AppError('Task not found', 404);

        if (!task.startTime) {
            throw new AppError('Timer is not running', 400);
        }

        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - task.startTime.getTime()) / 1000);
        const newDuration = task.duration + elapsedSeconds;

        return await prisma.task.update({
            where: { id },
            data: {
                startTime: null,
                duration: newDuration,
            },
        });
    }
}
