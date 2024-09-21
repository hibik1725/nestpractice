import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            user: jest.fn(),
            users: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('controllerが存在すること', () => {
    expect(controller).toBeDefined();
  });

  describe('user詳細取得のAPIに関するテスト', () => {
    it('should return a user when user exists', async () => {
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'sample password',
      };
      jest.spyOn(service, 'user').mockResolvedValue(mockUser);

      expect(await controller.findUserById('1')).toBe(mockUser);
    });

    it('存在しないユーザーの場合にはNotFoundExceptionがthrowされること', async () => {
      jest.spyOn(service, 'user').mockResolvedValue(null);

      await expect(controller.findUserById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('全ユーザー取得APIに関するテスト', () => {
    it('全ユーザーが取得できること', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'sample password',
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'sample password',
        },
      ];
      jest.spyOn(service, 'users').mockResolvedValue(mockUsers);

      expect(await controller.fetchAllUsers()).toBe(mockUsers);
    });
  });

  describe('ユーザー作成APIに関するテスト', () => {
    it('ユーザーが新たに作成できること', async () => {
      const mockUser: User = {
        id: 1,
        name: 'New User',
        email: 'newuser@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: 'sample password',
      };
      const createUserDto = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'sample password',
      };
      jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);

      expect(await controller.createUser(createUserDto)).toBe(mockUser);
    });
  });
});
