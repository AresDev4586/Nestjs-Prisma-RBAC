import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() body: { email: string; name?: string; tenant_id: string }) {
        if (!body.tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.usersService.createUser(body.email, body.name, body.tenant_id);
    }

    @Get()
    async findAll(@Body('tenant_id') tenant_id: string) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.usersService.findAllUsers(tenant_id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Body('tenant_id') tenant_id: string) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.usersService.findUserById(parseInt(id), tenant_id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: { name?: string; email?: string; tenant_id: string }
    ) {
        if (!body.tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.usersService.updateUser(parseInt(id), body.tenant_id, body.name, body.email);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Body('tenant_id') tenant_id: string) {
        if (!tenant_id) {
            throw new NotFoundException('Tenant ID is required.');
        }
        return await this.usersService.deleteUser(parseInt(id), tenant_id);
    }
}
