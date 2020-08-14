import {
  Args,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import RepoService from '../repo.service';
import User from 'src/db/models/user.entity';
import Message from 'src/db/models/message.entity';
import MessageInput from './input/message.input';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Resolver(() => Message)
class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => [Message])
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({
      where: {
        userId,
      },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      content: input.content,
      userId: input.userId,
    });
    const response = this.repoService.messageRepo.save(message);
    pubSub.publish('messageAdded', { messageAdded: response });
    return response;
  }

  @Subscription(() => Message)
  messageAdded(): any {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User)
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}
export default MessageResolver;
