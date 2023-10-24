import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateUserInput,
  UpdateUserInput,
  UsersGridInput,
} from 'src/types/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Protected

  @Mutation('createUser')
  @UseGuards(JwtAuthGuard)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  @UseGuards(JwtAuthGuard)
  findAll(@Args('grid') grid?: UsersGridInput) {
    return this.userService.findAll(grid);
  }

  @Query('user')
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation('deleteUser')
  @UseGuards(JwtAuthGuard)
  remove(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
