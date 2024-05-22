import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly database: DatabaseService) {}

  async addTask(name: string, userId: number, priority: number): Promise<Task> {
    return this.database.task.create({
      data: { name, userId, priority },
    });
  }

  async getTaskByName(name: string): Promise<Task | null> {
    return this.database.task.findFirst({
      where: { name },
    });
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return this.database.task.findMany({
      where: { userId },
    });
  }

  async resetData(): Promise<void> {
    await this.database.task.deleteMany();
  }
}
