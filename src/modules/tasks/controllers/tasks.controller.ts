import { TasksService } from '../services/tasks.service';
import { Controller, Get, Param, Post, Put, Delete, Patch, Body} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    TasksService:TasksService

    constructor(TasksService: TasksService ) {
        this.TasksService = TasksService
    }

    @Get('/')
    index() {
        return this.TasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.TasksService.getTaskById(parseInt(id));
    }

    @Post('/')
    createTask(@Body('name') name: string, @Body('description') description: string){
        return this.TasksService.createTask(name, description);
    }

    @Put('/:id')
    updateTask(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('status') status: boolean
    ){
        return this.TasksService.updateTask(parseInt(id), name, description, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string){
        return this.TasksService.deleteTask(parseInt(id));
    }

    @Patch('/:id')
    changeStatusTasks(
        @Param('id') id: string,
        @Body('status') status: boolean
    ){
        return this.TasksService.changeStatusTasks(parseInt(id), status);
    }

}
