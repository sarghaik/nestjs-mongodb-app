import { Controller, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionGuard } from './permission.guard';
import { Permission } from './permission.decorator';
import { PermissionType } from './permission.schema';
import { AuthGuard } from '@nestjs/passport';
import { ModifyPermissionDto } from './dto/permission.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('permission')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Permission(PermissionType.Admin)
  @Post('add')
  async addPermission(@Body() body: ModifyPermissionDto) {
    return this.permissionService.addPermission(body.userId, body.companyId, body.type);
  }
  
  @Permission(PermissionType.Admin)
  @Delete('remove')
  async removePermission(@Body() body: ModifyPermissionDto) {
    return this.permissionService.removePermission(body.userId, body.companyId, body.type);
  }
}