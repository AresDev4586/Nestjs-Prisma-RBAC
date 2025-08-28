import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async getAllTasks(tenant_id: string): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { tenant_id } });
    }

    async getTaskById(id: number, tenant_id: string): Promise<Task | null> {
        return this.prisma.task.findFirst({ where: { id, tenant_id } });
    }

    async createTask(name: string, description: string, userId: number, tenant_id: string): Promise<Task> {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, tenant_id }
        });
        if (!user) {
            throw new NotFoundException('User not found in this tenant.');
        }

        return this.prisma.task.create({
            data: { name, description, status: false, userId, tenant_id },
        });
    }

    async updateTask(id: number, name: string, description: string, status: boolean, tenant_id: string): Promise<Task | null> {
        return this.prisma.task.update({
            where: { id, tenant_id },
            data: { name, description, status },
        });
    }

    async deleteTask(id: number, tenant_id: string): Promise<{ deleted: boolean }> {
        // Verificar si la tarea existe y pertenece al tenant antes de borrar
        const taskToDelete = await this.prisma.task.findFirst({ where: { id, tenant_id } });
        if (!taskToDelete) {
            throw new NotFoundException('Task not found in this tenant.');
        }

        await this.prisma.task.delete({ where: { id } });
        return { deleted: true };
    }

    async changeStatusTasks(id: number, status: boolean, tenant_id: string): Promise<Task | null> {
        return this.prisma.task.update({
            where: { id, tenant_id },
            data: { status },
        });
    }
}