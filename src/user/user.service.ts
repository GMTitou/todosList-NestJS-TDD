import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  async addUser(email: string): Promise<User> {
    return this.database.user.create({
      data: { email },
    });
  }

  async getUser(email: string): Promise<User | null> {
    return this.database.user.findUnique({
      where: { email },
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.database.user.findUnique({
      where: { id: userId },
    });
  }

  async resetData(): Promise<void> {
    const users = await this.database.user.findMany();
    for (const user of users) {
      await this.database.task.deleteMany({
        where: {
          userId: user.id,
        },
      });
    }
    await this.database.user.deleteMany();
  }
  
}
