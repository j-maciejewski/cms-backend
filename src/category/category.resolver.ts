import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/types/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  // Public

  @Query('publicCategories')
  findAllPublic() {
    return this.categoryService.findAllPublic();
  }

  // Protected

  @Mutation('createCategory')
  @UseGuards(JwtAuthGuard)
  create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query('categories')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.categoryService.findAll();
  }

  @Query('category')
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation('updateCategory')
  @UseGuards(JwtAuthGuard)
  update(
    @Args('id') id: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @Mutation('deleteCategory')
  @UseGuards(JwtAuthGuard)
  remove(@Args('id') id: string) {
    return this.categoryService.delete(id);
  }
}
