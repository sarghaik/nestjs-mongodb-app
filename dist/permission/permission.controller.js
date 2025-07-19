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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./permission.service");
const permission_guard_1 = require("./permission.guard");
const permission_decorator_1 = require("./permission.decorator");
const permission_schema_1 = require("./permission.schema");
const passport_1 = require("@nestjs/passport");
const permission_dto_1 = require("./dto/permission.dto");
const swagger_1 = require("@nestjs/swagger");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    async addPermission(body) {
        return this.permissionService.addPermission(body.userId, body.companyId, body.type);
    }
    async removePermission(body) {
        return this.permissionService.removePermission(body.userId, body.companyId, body.type);
    }
};
__decorate([
    (0, permission_decorator_1.Permission)(permission_schema_1.PermissionType.Admin),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.ModifyPermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "addPermission", null);
__decorate([
    (0, permission_decorator_1.Permission)(permission_schema_1.PermissionType.Admin),
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.ModifyPermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "removePermission", null);
PermissionController = __decorate([
    (0, swagger_1.ApiTags)('permission'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
