import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGINATION } from 'src/consts';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMessageInput,
  MessagesGridInput,
  UpdateMessageInput,
} from 'src/types/graphql';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, content }: CreateMessageInput) {
    this.prisma.message.create({
      data: { name, email, content },
    });

    return true;
  }

  async findAll(grid?: MessagesGridInput) {
    const messagesCount = await this.prisma.message.count();

    const messagesRows = await this.prisma.message.findMany({
      orderBy: [{ createdAt: 'desc' }],
      skip: (grid?.page - 1) * (grid?.limit ?? DEFAULT_PAGINATION) || 0,
      take: grid?.limit ?? DEFAULT_PAGINATION,
    });

    return { total: messagesCount, rows: messagesRows };
  }

  findOne(id: string) {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  update(id: string, { email }: UpdateMessageInput) {
    return this.prisma.message.update({
      where: { id },
      data: { email },
    });
  }

  delete(id: string) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
