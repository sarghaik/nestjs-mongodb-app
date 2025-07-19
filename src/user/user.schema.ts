import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  @ApiProperty({ example: 'John Doe' })
  name: string = '';

  @Prop({ type: String, required: true, unique: true })
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string = '';

  @Prop({ type: String, required: true })
  @ApiProperty({ example: 'password123' })
  password: string = '';
}

export const UserSchema = SchemaFactory.createForClass(User);