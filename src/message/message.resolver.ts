import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import {
  CreateMessageInput,
  MessagesGridInput,
  UpdateMessageInput,
} from 'src/types/graphql';

@Resolver('Message')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation('createMessage')
  create(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    return this.messageService.create(createMessageInput);
  }

  @Query('messages')
  findAll(@Args('grid') grid?: MessagesGridInput) {
    return this.messageService.findAll(grid);
  }

  @Query('message')
  findOne(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation('updateMessage')
  update(
    @Args('id') id: string,
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(id, updateMessageInput);
  }

  @Mutation('deleteMessage')
  remove(@Args('id') id: string) {
    return this.messageService.delete(id);
  }
}
