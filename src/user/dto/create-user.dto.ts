import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsEmail, MinLength, IsOptional, IsMongoId } from 'class-validator';

export class CreateUserDto {
  
  @ApiProperty()
  @IsString()
  name: string = '';

  @ApiProperty()
  @IsEmail()
  email: string = '';

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string = '';

  @ApiProperty()
  @IsOptional()  
  @IsMongoId()
  companyId: string = '';
}