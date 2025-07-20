import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//TODO: Add extra entity for project user relation to get each projects users
//TODO: Move enums into a separate file

export enum ProjectStatus {
  Active = 'Active',
  Archived = 'Archived'
}

export enum ProjectPriority {
  High = 1,
  Medium = 2,
  Low = 3,
}

@Schema()
export class Project extends Document {
  @Prop({ type: String, required: true })
  @ApiProperty({example: 'Project Alpha'})
  name: string = '';

  @Prop({ type: String })
  @ApiPropertyOptional({example: 'Description for Project Alpha'})
  description?: string = '';

  @Prop({ required: true, enum: ProjectStatus, type: Number })
  @ApiProperty({ enum: ProjectStatus, example: ProjectStatus.Active })
  status: ProjectStatus = ProjectStatus.Active;

  @Prop({ enum: ProjectPriority, type: Number, default: ProjectPriority.Medium })
  @ApiProperty({ enum: ProjectPriority, example: ProjectPriority.Medium })
  priority?: ProjectPriority = ProjectPriority.Medium;

  @Prop({ type: [String] })
  @ApiPropertyOptional({ type: [String], example: ['tag1', 'tag2'] })
  tags?: string[] = [];

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  @ApiProperty({ type: String, example: new Types.ObjectId().toString() })
  companyId: Types.ObjectId = new Types.ObjectId();
}

export const ProjectSchema = SchemaFactory.createForClass(Project);