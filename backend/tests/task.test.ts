import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

describe('Task API', () => {
    beforeAll(async () => {
        const url = process.env.DATABASE_URL?.replace(/^["']|["']$/g, '').trim();
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: url,
                },
            },
        });
        // Clean database
        await prisma.task.deleteMany();
        await prisma.project.deleteMany();
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    let userId: string;
    let projectId: string;
    let taskId: string;

    it('should create a user and project first', async () => {
        // Create User
        const userRes = await request(app).post('/api/users').send({
            name: 'Task User',
            email: 'taskuser@example.com',
            password: 'password123',
        });
        userId = userRes.body.id;

        // Create Project
        const projectRes = await request(app).post('/api/projects').send({
            name: 'Task Project',
            userId: userId,
        });
        projectId = projectRes.body.id;

        expect(userId).toBeDefined();
        expect(projectId).toBeDefined();
    });

    it('should create a new task', async () => {
        const res = await request(app).post('/api/tasks').send({
            title: 'New Task',
            description: 'Task Description',
            userId: userId,
            projectId: projectId,
            priority: 'high',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toBe('New Task');
        expect(res.body.priority).toBe('high');
        taskId = res.body.id;
    });

    it('should get all tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should filter tasks by project', async () => {
        const res = await request(app).get(`/api/tasks?projectId=${projectId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].projectId).toBe(projectId);
    });

    it('should start the timer', async () => {
        const res = await request(app).post(`/api/tasks/${taskId}/start`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.startTime).not.toBeNull();
    });

    it('should not start timer if already running', async () => {
        const res = await request(app).post(`/api/tasks/${taskId}/start`);
        expect(res.statusCode).toEqual(400);
    });

    it('should stop the timer', async () => {
        // Wait a bit to ensure duration > 0 (mocking time passage might be flaky, so we just check logic)
        await new Promise((r) => setTimeout(r, 1100));

        const res = await request(app).post(`/api/tasks/${taskId}/stop`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.startTime).toBeNull();
        expect(res.body.duration).toBeGreaterThan(0);
    });

    it('should update a task', async () => {
        const res = await request(app).put(`/api/tasks/${taskId}`).send({
            status: 'completed',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('completed');
    });

    it('should delete a task', async () => {
        const res = await request(app).delete(`/api/tasks/${taskId}`);
        expect(res.statusCode).toEqual(204);
    });
});
