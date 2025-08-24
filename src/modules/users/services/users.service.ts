import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(email: string, name?: string) {
    return this.prisma.user.create({
      data: { email, name },
    });
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }
}
