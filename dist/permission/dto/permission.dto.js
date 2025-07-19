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
exports.ModifyPermissionDto = void 0;
const class_validator_1 = require("class-validator");
const permission_schema_1 = require("../permission.schema");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
class ModifyPermissionDto {
    constructor() {
        this.userId = new mongoose_1.Types.ObjectId().toString();
        this.companyId = new mongoose_1.Types.ObjectId().toString();
        this.type = permission_schema_1.PermissionType.Read; // Default to Read permission
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ModifyPermissionDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ModifyPermissionDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: permission_schema_1.PermissionType, example: 'read' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(permission_schema_1.PermissionType),
    __metadata("design:type", String)
], ModifyPermissionDto.prototype, "type", void 0);
exports.ModifyPermissionDto = ModifyPermissionDto;
