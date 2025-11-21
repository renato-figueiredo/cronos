import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

describe('User API', () => {
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

    it('should create a new user', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('test@example.com');
        expect(res.body).not.toHaveProperty('password');
        userId = res.body.id;
    });

    it('should not create a user with existing email', async () => {
        const res = await request(app).post('/api/users').send({
            name: 'Another User',
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.statusCode).toEqual(400);
    });

    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).not.toHaveProperty('password');
    });

    it('should get a user by id', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(userId);
        expect(res.body).not.toHaveProperty('password');
    });

    it('should update a user', async () => {
        const res = await request(app).put(`/api/users/${userId}`).send({
            name: 'Updated Name',
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Name');
        expect(res.body).not.toHaveProperty('password');
    });

    it('should delete a user', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 for deleted user', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(404);
    });
});
