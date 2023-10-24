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
  findAll(@Args('grid') grid?: ArticlesGridInput) {
    return this.articleService.findAll(grid);
  }

  @Query('article')
  findOne(@Args('filter') filter: ArticleFilterInput) {
    return this.articleService.findOne(filter);
  }

  @Mutation('createArticle')
  create(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
    return this.articleService.create(createArticleInput);
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
