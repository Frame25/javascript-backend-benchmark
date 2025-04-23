import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
    const { name, email } = body;
    return this.userService.createUser(name, email);
  }

  @Post(':id/posts')
  async addPost(@Param('id') id: number, @Body() body: { title: string; content: string }) {
    const { title, content } = body;
    return this.userService.addPost(id, title, content);
  }
}
