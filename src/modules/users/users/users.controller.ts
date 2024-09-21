import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';

// httpのroutingのみを記載する（ロジックはここには含めない)

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // routeからparamsを受け取る時はhttp methodの引数にparameterの名前を記述する
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.user(Number(id));
    if (!user) {
      throw new NotFoundException('対象のユーザーが見つかりません');
    }
    return user;
  }

  @Get()
  async fetchAllUsers(): Promise<User[]> {
    return this.usersService.users();
  }

  // http request bodyからデータを受け取る時は@Body()を記述する
  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(data);
  }
}
