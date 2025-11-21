import { PrismaClient, User } from '@prisma/client';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Define the fields to return, excluding password
const userSelect = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
};

export class UserService {
    async createUser(data: { name: string; email: string; password?: string }): Promise<Omit<User, 'password'>> {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(data.password || 'default_password', 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
            select: userSelect,
        });

        return user;
    }

    async getUserById(id: string): Promise<Omit<User, 'password'>> {
        const user = await prisma.user.findUnique({
            where: { id },
            select: userSelect,
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        return await prisma.user.findMany({
            select: userSelect,
        });
    }

    async updateUser(id: string, data: Partial<User>): Promise<Omit<User, 'password'>> {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // If password is being updated, hash it
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return await prisma.user.update({
            where: { id },
            data,
            select: userSelect,
        });
    }

    async deleteUser(id: string): Promise<void> {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        await prisma.user.delete({ where: { id } });
    }
}
