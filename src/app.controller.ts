import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './infrastructure/database/database.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: DatabaseService) {}

  @Get('test-db')
  async testDb() {
    return this.prisma.user.findMany();
  }
}
