import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGINATION } from 'src/consts';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserInput,
  UpdateUserInput,
  UsersGridInput,
} from 'src/types/graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create({ email, firstName, lastName }: CreateUserInput) {
    return this.prisma.user.create({
      data: { email, password: 'test', firstName, lastName },
      include: { articles: true },
    });
  }

  async findAll(grid?: UsersGridInput) {
    const usersCount = await this.prisma.user.count();

    const usersRows = await this.prisma.user.findMany({
      orderBy: [{ createdAt: 'desc' }],
      skip: (grid?.page - 1) * (grid?.limit ?? DEFAULT_PAGINATION) || 0,
      take: grid?.limit ?? DEFAULT_PAGINATION,
    });

    return { total: usersCount, rows: usersRows };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { articles: true },
    });
  }

  update(id: string, { email }: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: { email },
      include: { articles: true },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
      include: { articles: true },
    });
  }
}
