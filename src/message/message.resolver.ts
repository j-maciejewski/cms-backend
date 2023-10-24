import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import {
  CreateMessageInput,
  MessagesGridInput,
  UpdateMessageInput,
} from 'src/types/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Message')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  // Public

  @Mutation('createMessage')
  create(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    return this.messageService.create(createMessageInput);
  }

  // Protected

  @Query('messages')
  @UseGuards(JwtAuthGuard)
  findAll(@Args('grid') grid?: MessagesGridInput) {
    return this.messageService.findAll(grid);
  }

  @Query('message')
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation('updateMessage')
  @UseGuards(JwtAuthGuard)
  update(
    @Args('id') id: string,
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(id, updateMessageInput);
  }

  @Mutation('deleteMessage')
  @UseGuards(JwtAuthGuard)
  remove(@Args('id') id: string) {
    return this.messageService.delete(id);
  }
}
