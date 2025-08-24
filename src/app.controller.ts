import { AppService } from './app.service';
import { Controller, Get } from "@nestjs/common";

@Controller({})
export class AppController {
    AppService: AppService

    constructor(AppService: AppService){
        this.AppService = AppService
    }

    @Get('/')
    getApp() {
        return this.AppService.getAppIndex()
    }
}