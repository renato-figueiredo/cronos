import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

describe('Project API', () => {
    beforeAll(async () => {
        const url = process.env.DATABASE_URL?.replace(/^["']|["']$/g, '').trim();
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: url,
                },
            },
        });
        // Clean database before tests
        await prisma.task.deleteMany();
        await prisma.project.deleteMany();
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    let userId: string;
    let projectId: string;

    it('should create a user first', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'Project Owner',
            email: 'owner@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        userId = res.body.id;
    });

    it('should create a new project', async () => {
        const res = await request(app).post('/api/projects').send({
            name: 'New Project',
            description: 'Project Description',
            userId: userId,
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('New Project');
        expect(res.body.userId).toBe(userId);
        projectId = res.body.id;
    });

    it('should get all projects', async () => {
        const res = await request(app).get('/api/projects');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a project by id', async () => {
        const res = await request(app).get(`/api/projects/${projectId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(projectId);
        expect(res.body.user).toBeDefined(); // Check if user info is included
    });

    it('should update a project', async () => {
        const res = await request(app).put(`/api/projects/${projectId}`).send({
            name: 'Updated Project Name',
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Project Name');
    });

    it('should delete a project', async () => {
        const res = await request(app).delete(`/api/projects/${projectId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 for deleted project', async () => {
        const res = await request(app).get(`/api/projects/${projectId}`);
        expect(res.statusCode).toEqual(404);
    });
});
