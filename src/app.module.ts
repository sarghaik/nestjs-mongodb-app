import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongodb-app'), // Replace with your MongoDB connection string
    UserModule,
    CompanyModule,
    ProjectModule,
    AuthModule,
    PermissionModule,
  ],
})
export class AppModule {}