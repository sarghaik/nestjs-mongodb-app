import { IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { PermissionType } from '../permission.schema';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ModifyPermissionDto {
  @ApiProperty()
  @IsMongoId()
  userId: string = new Types.ObjectId().toString();

  @ApiProperty()  
  @IsMongoId()
  companyId: string = new Types.ObjectId().toString();

  @ApiPropertyOptional({ enum: PermissionType, example: 'read' })
  @IsOptional()
  @IsEnum(PermissionType)
  type: PermissionType = PermissionType.Read; // Default to Read permission
}