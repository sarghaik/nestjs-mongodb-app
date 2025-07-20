"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = __importStar(require("bcryptjs"));
const permission_service_1 = require("../permission/permission.service");
const permission_schema_1 = require("../permission/permission.schema");
let UserService = class UserService {
    constructor(userModel, permissionService) {
        this.userModel = userModel;
        this.permissionService = permissionService;
    }
    async createUser(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
        const newUser = createdUser.save();
        if (createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.companyId) {
            const hasPermission = await this.permissionService.addPermission(createdUser._id, createUserDto.companyId, permission_schema_1.PermissionType.Read);
        }
        return newUser;
    }
    async findUser(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async updateUser(id, updateUserDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }
    async deleteUser(id) {
        const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        permission_service_1.PermissionService])
], UserService);
exports.UserService = UserService;
