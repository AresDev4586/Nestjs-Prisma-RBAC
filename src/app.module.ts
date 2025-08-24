import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';


@Module({
  imports: [TasksModule],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}
