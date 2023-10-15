import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from 'src/types/graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create({ email, firstName, lastName }: CreateUserInput) {
    return this.prisma.user.create({
      data: { email, password: 'test', firstName, lastName },
      include: { articles: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
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
