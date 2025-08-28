import { TasksService } from '../services/tasks.service';
import { Controller, Get, Param, Post, Put, Delete, Patch, Body, NotFoundException } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    TasksService: TasksService

    constructor(TasksService: TasksService) {
        this.TasksService = TasksService
    }

    @Get('/')
    async index(@Body('tenant_id') tenant_id: string) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.TasksService.getAllTasks(tenant_id);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string, @Body('tenant_id') tenant_id: string) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.TasksService.getTaskById(parseInt(id), tenant_id);
    }

    @Post('/')
    async createTask(
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('userId') userId: number,
        @Body('tenant_id') tenant_id: string
    ) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.TasksService.createTask(name, description, userId, tenant_id);
    }

    @Put('/:id')
    async updateTask(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('status') status: boolean,
        @Body('tenant_id') tenant_id: string
    ) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.TasksService.updateTask(parseInt(id), name, description, status, tenant_id);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string, @Body('tenant_id') tenant_id: string) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.TasksService.deleteTask(parseInt(id), tenant_id);
    }

    @Patch('/:id')
    async changeStatusTasks(
        @Param('id') id: string,
        @Body('status') status: boolean,
        @Body('tenant_id') tenant_id: string
    ) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.TasksService.changeStatusTasks(parseInt(id), status, tenant_id);
    }
}
