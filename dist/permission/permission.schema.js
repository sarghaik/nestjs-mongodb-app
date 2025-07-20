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
exports.PermissionSchema = exports.Permission = exports.PermissionType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
// TODO: Update Permission Schema with domain fields
//  to add specific permission guard to each domain
var PermissionType;
(function (PermissionType) {
    PermissionType["Read"] = "read";
    PermissionType["Write"] = "write";
    PermissionType["Delete"] = "delete";
    PermissionType["Admin"] = "admin";
})(PermissionType = exports.PermissionType || (exports.PermissionType = {}));
let Permission = class Permission extends mongoose_2.Document {
    constructor() {
        super(...arguments);
        this.userId = new mongoose_2.Types.ObjectId();
        this.companyId = new mongoose_2.Types.ObjectId();
        this.type = PermissionType.Read;
    }
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Permission.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Company', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Permission.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: PermissionType, required: true }),
    __metadata("design:type", String)
], Permission.prototype, "type", void 0);
Permission = __decorate([
    (0, mongoose_1.Schema)()
], Permission);
exports.Permission = Permission;
exports.PermissionSchema = mongoose_1.SchemaFactory.createForClass(Permission);
