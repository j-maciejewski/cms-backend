import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/types/graphql';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create({ name, slug }: CreateCategoryInput) {
    return this.prisma.category.create({
      data: { name, slug: slug ?? name.toLowerCase() },
      include: { articles: true },
    });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: { articles: true, _count: { select: { articles: true } } },
    });

    return categories.map(({ _count, ...rest }) => ({
      ...rest,
      articlesCount: _count.articles,
    }));
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { articles: true },
    });
  }

  update(id: string, { name }: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: { id },
      data: { name },
      include: { articles: true },
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
      include: { articles: true },
    });
  }
}
