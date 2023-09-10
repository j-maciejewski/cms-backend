import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DEFAULT_PAGINATION } from 'src/consts';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ArticleFilterInput,
  ArticlesGridInput,
  CreateArticleInput,
  UpdateArticleInput,
} from 'src/types/graphql';
import { generateFilename, saveImage } from 'src/utils/saveImage';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create({
    title,
    leadImage,
    content,
    slug,
    authorId,
    categoryId,
  }: CreateArticleInput) {
    const fileName = generateFilename('png');

    const data = await this.prisma.article.create({
      data: {
        title,
        leadImage: fileName,
        content,
        slug: slug ?? title.toLowerCase(),
        author: { connect: { id: authorId } },
        category: { connect: { id: categoryId } },
      },
    });

    await saveImage(leadImage, fileName);

    return data;
  }

  async findAll(grid?: ArticlesGridInput) {
    const filters: Prisma.ArticleWhereInput = {
      category: {
        slug: grid?.filter?.categorySlug,
      },
      categoryId: grid?.filter?.categoryId,
      authorId: grid?.filter?.authorId,
      ...(grid?.filter?.fullText
        ? { title: { contains: grid?.filter?.fullText, mode: 'insensitive' } }
        : {}),
    };

    const articlesCount = await this.prisma.article.count({
      where: filters,
    });

    const articlesRows = await this.prisma.article.findMany({
      include: { category: true, author: true },
      orderBy: [{ createdAt: 'desc' }],
      where: filters,
      skip: (grid?.page - 1) * (grid?.limit ?? DEFAULT_PAGINATION) || 0,
      take: grid?.limit ?? DEFAULT_PAGINATION,
    });

    return { total: articlesCount, rows: articlesRows };
  }

  findOne(filter: ArticleFilterInput) {
    if (filter.id != null && filter.slug != null) {
      throw new PrismaClientKnownRequestError(
        'Provide only one filter variables',
        { code: '404', clientVersion: '1.1.1' },
      );
    }

    return this.prisma.article.findFirst({
      where: { OR: [{ id: filter.id }, { slug: filter.slug }] },
    });
  }

  update(id: string, { title }: UpdateArticleInput) {
    return this.prisma.article.update({
      where: { id },
      data: { title },
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}