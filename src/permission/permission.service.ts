import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Permission, PermissionType } from './permission.schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async hasPermission(
    userId: Types.ObjectId | string,
    companyId: Types.ObjectId | string,
    requiredType: PermissionType | string,
  ): Promise<boolean> {
    console.log('Checking permission for user:', userId, 'in company:', companyId, 'for type:', requiredType);
    const permission = await this.permissionModel.findOne({
      userId: new Types.ObjectId(userId),
      companyId: new Types.ObjectId(companyId),
      type: requiredType,
    }).exec();
    console.log('Checking permission:', permission);
    return !!permission;
  }

  async addPermission(userId: string, companyId: string, type: PermissionType) {
    const permission = new this.permissionModel({
      userId: new Types.ObjectId(userId),
      companyId: new Types.ObjectId(companyId),
      type,
    });
    return permission.save();
  }

  async removePermission(userId: string, companyId: string, type: PermissionType) {
    return this.permissionModel.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      companyId: new Types.ObjectId(companyId),
      type,
    }).exec();
  }
}