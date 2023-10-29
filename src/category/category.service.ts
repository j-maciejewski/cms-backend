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

  async findAllPublic() {
    const categories = await this.prisma.category.findMany({
      where: {
        isHidden: false,
        articles: {
          some: {},
        },
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return categories;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: { articles: true, _count: { select: { articles: true } } },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return categories.map(({ _count, ...rest }) => ({
      ...rest,
      articlesCount: _count.articles,
    }));
  }

  async findOne(id: string) {
    const { _count, ...rest } = await this.prisma.category.findUnique({
      where: { id },
      include: { articles: true, _count: { select: { articles: true } } },
    });

    return { articlesCount: _count.articles, ...rest };
  }

  update(id: string, { name, slug, isHidden }: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: { id },
      data: { name, slug, isHidden },
    });
  }

  delete(id: string) {
    return this.prisma.category.delete({
      where: { id },
      include: { articles: true },
    });
  }
}
