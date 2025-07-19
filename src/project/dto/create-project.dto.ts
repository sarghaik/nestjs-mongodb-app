import { IsString, IsOptional, IsEnum, IsInt, IsArray, IsMongoId } from 'class-validator';
import { ProjectStatus, ProjectPriority } from '../project.schema';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  name: string = '';

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @IsEnum(ProjectPriority)
  @IsOptional()
  priority?: ProjectPriority;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsMongoId()
  companyId: string = new Types.ObjectId().toString();
} 