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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const permission_schema_1 = require("./permission.schema");
let PermissionService = class PermissionService {
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async hasPermission(userId, companyId, requiredType) {
        console.log('Checking permission for user:', userId, 'in company:', companyId, 'for type:', requiredType);
        const permission = await this.permissionModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            companyId: new mongoose_2.Types.ObjectId(companyId),
            type: requiredType,
        }).exec();
        console.log('Checking permission:', permission);
        return !!permission;
    }
    async addPermission(userId, companyId, type) {
        const permission = new this.permissionModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            companyId: new mongoose_2.Types.ObjectId(companyId),
            type,
        });
        return permission.save();
    }
    async removePermission(userId, companyId, type) {
        return this.permissionModel.findOneAndDelete({
            userId: new mongoose_2.Types.ObjectId(userId),
            companyId: new mongoose_2.Types.ObjectId(companyId),
            type,
        }).exec();
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PermissionService);
exports.PermissionService = PermissionService;
