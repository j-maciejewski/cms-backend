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

  @Query('homePageArticles')
  findHomePageArticles() {
    return this.articleService.findHomePageArticles();
  }

  @Query('highlightedArticles')
  findHighlightedArticles() {
    return this.articleService.findHighlightedArticles();
  }

  @Mutation('updateArticle')
  update(
    @Args('id') id: string,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(id, updateArticleInput);
  }

  @Mutation('deleteArticle')
  remove(@Args('id') id: string) {
    return this.articleService.delete(id);
  }
}
