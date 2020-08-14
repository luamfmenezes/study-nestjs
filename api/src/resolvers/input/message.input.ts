import { Field, InputType } from '@nestjs/graphql';
// import UserInput from './user.input';

// @InputType()
// class UserMessageConnectInput {
//   @Field()
//   readonly id: number;
// }

// @InputType()
// class MessageUserInput {
//   @Field({ nullable: true })
//   readonly connect: UserMessageConnectInput;

//   @Field({ nullable: true })
//   readonly create: UserInput;
// }

@InputType()
class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

export default MessageInput;
