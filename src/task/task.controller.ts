import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Get('user/:userId')
  async getUserTasks(@Param('userId') userId: string) {
    if (!userId.match(/^\d+$/)) {
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    }
    const tasks = await this.taskService.getUserTasks(Number(userId));
    if (!tasks.length) {
      throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
    }
    return { statusCode: 200, data: tasks };
  }

  @Post()
  async addTask(@Body() addTaskDto: any) {
    const { name, userId, priority } = addTaskDto;
    if (!name || !userId || isNaN(priority) || priority <= 0) {
      throw new HttpException('Invalid task data', HttpStatus.BAD_REQUEST);
    }
    const priorityInt = +priority;
    const task = await this.taskService.addTask(name, userId, priorityInt);
    return { statusCode: 201, data: task };
  }
}
