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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const api_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-property.decorator");
const mongoose_2 = require("mongoose");
let User = class User extends mongoose_2.Document {
    constructor() {
        super(...arguments);
        this.name = '';
        this.email = '';
        this.password = '';
    }
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, api_property_decorator_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    (0, api_property_decorator_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, api_property_decorator_1.ApiProperty)({ example: 'password123' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
