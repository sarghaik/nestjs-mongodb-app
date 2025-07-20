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
exports.ProjectSchema = exports.Project = exports.ProjectPriority = exports.ProjectStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
//TODO: Add extra entity for project user relation to get each projects users
//TODO: Move enums into a separate file
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["Active"] = "Active";
    ProjectStatus["Archived"] = "Archived";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
var ProjectPriority;
(function (ProjectPriority) {
    ProjectPriority[ProjectPriority["High"] = 1] = "High";
    ProjectPriority[ProjectPriority["Medium"] = 2] = "Medium";
    ProjectPriority[ProjectPriority["Low"] = 3] = "Low";
})(ProjectPriority = exports.ProjectPriority || (exports.ProjectPriority = {}));
let Project = class Project extends mongoose_2.Document {
    constructor() {
        super(...arguments);
        this.name = '';
        this.description = '';
        this.status = ProjectStatus.Active;
        this.priority = ProjectPriority.Medium;
        this.tags = [];
        this.companyId = new mongoose_2.Types.ObjectId();
    }
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, swagger_1.ApiProperty)({ example: 'Project Alpha' }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiPropertyOptional)({ example: 'Description for Project Alpha' }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ProjectStatus, type: Number }),
    (0, swagger_1.ApiProperty)({ enum: ProjectStatus, example: ProjectStatus.Active }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ProjectPriority, type: Number, default: ProjectPriority.Medium }),
    (0, swagger_1.ApiProperty)({ enum: ProjectPriority, example: ProjectPriority.Medium }),
    __metadata("design:type", Number)
], Project.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['tag1', 'tag2'] }),
    __metadata("design:type", Array)
], Project.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Company', required: true }),
    (0, swagger_1.ApiProperty)({ type: String, example: new mongoose_2.Types.ObjectId().toString() }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Project.prototype, "companyId", void 0);
Project = __decorate([
    (0, mongoose_1.Schema)()
], Project);
exports.Project = Project;
exports.ProjectSchema = mongoose_1.SchemaFactory.createForClass(Project);
