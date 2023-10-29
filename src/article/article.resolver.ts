import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import {
  ArticleFilterInput,
  ArticlesGridInput,
  CreateArticleInput,
  UpdateArticleInput,
} from 'src/types/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  // Public

  @Query('publicArticles')
  findAllPublic(@Args('grid') grid?: ArticlesGridInput) {
    return this.articleService.findAllPublic(grid);
  }

  @Query('publicArticle')
  findOnePublic(@Args('filter') filter: ArticleFilterInput) {
    return this.articleService.findOnePublic(filter);
  }

  @Query('publicHomePageArticles')
  findHomePageArticles() {
    return this.articleService.findHomePageArticles();
  }

  @Query('publicHighlightedArticles')
  findHighlightedArticles() {
    return this.articleService.findHighlightedArticles();
  }

  // Protected

  @Query('articles')
  @UseGuards(JwtAuthGuard)
  findAll(@Args('grid') grid?: ArticlesGridInput) {
    return this.articleService.findAll(grid);
  }

  @Query('article')
  @UseGuards(JwtAuthGuard)
  findOne(@Args('filter') filter: ArticleFilterInput) {
    return this.articleService.findOne(filter);
  }

  @Mutation('createArticle')
  @UseGuards(JwtAuthGuard)
  create(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @Context() context,
  ) {
    return this.articleService.create(
      createArticleInput,
      context.req.user.data.id,
    );
  }

  @Mutation('updateArticle')
  @UseGuards(JwtAuthGuard)
  update(
    @Args('id') id: string,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(id, updateArticleInput);
  }

  @Mutation('deleteArticle')
  @UseGuards(JwtAuthGuard)
  remove(@Args('id') id: string) {
    return this.articleService.delete(id);
  }
}
