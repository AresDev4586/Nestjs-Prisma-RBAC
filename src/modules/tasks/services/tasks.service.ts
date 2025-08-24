import { Injectable } from '@nestjs/common';
import { Tasks } from '../dto/tasks.type';
import { tasksMock } from '../mocks/tasks.mock';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [...tasksMock];

    getAllTasks(): Tasks[] {
        return this.tasks;
    }

    getTaskById(id: number): Tasks | undefined {
        return this.tasks.find(task => task.id === id);
    }

    createTask(name: string, description: string): Tasks {
        const newTask: Tasks = {
            id: this.tasks.length + 1,
            name,
            description,
            status: false,
        };
        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id: number, name: string, description: string, status: boolean): Tasks | undefined {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], name, description, status };
            return this.tasks[taskIndex];
        }
        return undefined;
    }

    deleteTask(id: number): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks.length < initialLength;
    }

    changeStatusTasks(id: number, status: boolean): Tasks | undefined {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], status };
            return this.tasks[taskIndex];
        }
        return undefined;
    }
}
