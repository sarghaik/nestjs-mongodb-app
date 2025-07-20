import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { PermissionService } from '../permission/permission.service';
import { PermissionType } from '../permission/permission.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, 
    private readonly permissionService: PermissionService) {}

  async createUser(createUserDto: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const newUser = createdUser.save();
    if (createUserDto?.companyId) {
      const hasPermission = await this.permissionService.addPermission(
        createdUser._id, 
        createUserDto.companyId, 
        PermissionType.Read);
    }
    return newUser;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}