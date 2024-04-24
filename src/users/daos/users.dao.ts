import {PrismaClient} from '@prisma/client';
import {CreateUserDto} from '../dto/create.user.dto';
import {PatchUserDto} from '../dto/patch.user.dto';
import {PutUserDto} from '../dto/put.user.dto';

class UsersDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async addUser(user: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        dateofbirth: user.dateOfBirth,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.username,
        password: user.password,
        location: user.location,
        bio: user.bio,
        gender: user.gender,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async putUserById(userId: number, user: PutUserDto) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dateofbirth: user.dateOfBirth,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        username: user.username,
        password: user.password,
        updated_at: new Date(),
      },
    });
  }

  async patchUserById(userId: number, user: PatchUserDto) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const updatedUser = {...currentUser, ...user};

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dateofbirth: updatedUser.dateOfBirth,
        email: updatedUser.email,
        firstname: updatedUser.firstName,
        lastname: updatedUser.lastName,
        username: updatedUser.username,
        password: updatedUser.password,
        updated_at: new Date(),
      },
    });
  }

  async removeUserById(userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        is_active: false,
        updated_at: new Date(),
      },
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }
}

export default new UsersDao();
