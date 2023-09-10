import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import {
  ArticleFilterInput,
  ArticlesGridInput,
  CreateArticleInput,
  UpdateArticleInput,
} from 'src/types/graphql';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation('createArticle')
  create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
    return this.articleService.create(createArticleInput);
  }

  @Query('articles')
  findAll(@Args('grid') grid?: ArticlesGridInput) {
    return this.articleService.findAll(grid);
  }

  @Query('article')
  findOne(@Args('filter') filter: ArticleFilterInput) {
    return this.articleService.findOne(filter);
  }

  @Mutation('updateArticle')
  update(@Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
    return this.articleService.update(
      updateArticleInput.id,
      updateArticleInput,
    );
  }

  @Mutation('removeArticle')
  remove(@Args('id') id: string) {
    return this.articleService.remove(id);
  }
}
