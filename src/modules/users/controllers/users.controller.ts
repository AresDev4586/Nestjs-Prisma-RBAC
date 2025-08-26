import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() body: { email: string; name?: string }) {
        return this.usersService.createUser(body.email, body.name);
    }

    @Get()
    findAll() {
        return this.usersService.findAllUsers();
    }
}
