import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(email: string, name: string | undefined, tenant_id: string): Promise<User> {
        return this.prisma.user.create({
            data: { email, name, tenant_id },
        });
    }

    async findAllUsers(tenant_id: string): Promise<User[]> {
        return this.prisma.user.findMany({ where: { tenant_id } });
    }

    async findUserById(id: number, tenant_id: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { id, tenant_id } });
    }

    async updateUser(id: number, tenant_id: string, name?: string, email?: string): Promise<User | null> {
        // Verificar que el usuario existe y pertenece al tenant antes de actualizar
        const userToUpdate = await this.prisma.user.findFirst({ where: { id, tenant_id } });
        if (!userToUpdate) {
            throw new NotFoundException('User not found in this tenant.');
        }
        return this.prisma.user.update({
            where: { id, tenant_id },
            data: { name, email },
        });
    }

    async deleteUser(id: number, tenant_id: string): Promise<{ deleted: boolean }> {
        // Verificar que el usuario existe y pertenece al tenant antes de borrar
        const userToDelete = await this.prisma.user.findFirst({ where: { id, tenant_id } });
        if (!userToDelete) {
            throw new NotFoundException('User not found in this tenant.');
        }
        await this.prisma.user.delete({ where: { id } });
        return { deleted: true };
    }
}
