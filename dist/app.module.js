"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const company_module_1 = require("./company/company.module");
const project_module_1 = require("./project/project.module");
const auth_module_1 = require("./auth/auth.module");
const permission_module_1 = require("./permission/permission.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/nestjs-mongodb-app'),
            user_module_1.UserModule,
            company_module_1.CompanyModule,
            project_module_1.ProjectModule,
            auth_module_1.AuthModule,
            permission_module_1.PermissionModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
