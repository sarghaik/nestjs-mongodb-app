import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// TODO: Update Permission Schema with domain fields
//  to add specific permission guard to each domain

export enum PermissionType {
  Read = 'read',
  Write = 'write',
  Delete = 'delete',
  Admin = 'admin',
}

@Schema()
export class Permission extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId = new Types.ObjectId();

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId = new Types.ObjectId();

  @Prop({ type: String, enum: PermissionType, required: true })
  type: PermissionType = PermissionType.Read;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);