import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>('permission', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub || request.user.userId; // Adjust based on your user object structure
    if (!userId) {
      throw new ForbiddenException('Insufficient permissions');
    }
    const companyId = request.body.companyId || request.params.companyId;

    const hasPermission = await this.permissionService.hasPermission(userId, companyId, requiredPermission);
    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
}