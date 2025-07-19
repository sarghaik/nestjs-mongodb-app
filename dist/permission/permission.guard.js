"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./permission.service");
const core_1 = require("@nestjs/core");
let PermissionGuard = class PermissionGuard {
    constructor(permissionService, reflector) {
        this.permissionService = permissionService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredPermission = this.reflector.get('permission', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const userId = request.user.sub || request.user.userId; // Adjust based on your user object structure
        if (!userId) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        const companyId = request.body.companyId || request.params.companyId;
        const hasPermission = await this.permissionService.hasPermission(userId, companyId, requiredPermission);
        if (!hasPermission) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_service_1.PermissionService,
        core_1.Reflector])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
