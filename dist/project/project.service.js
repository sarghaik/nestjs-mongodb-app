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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("./project.schema");
//TODO: Update any to specific DTOs as needed
let ProjectService = class ProjectService {
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async createProject(createProjectDto) {
        const createdProject = new this.projectModel(createProjectDto);
        return createdProject.save();
    }
    async findProjects(companyId) {
        return this.projectModel.find({ companyId }, '_id name description status priority tags companyId').lean().exec();
    }
    async updateProject(id, updateProjectDto) {
        const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true })
            .select('_id name description status priority tags companyId').lean().exec();
        if (!updatedProject) {
            throw new Error('Project not found');
        }
        return updatedProject;
    }
    async deleteProject(id) {
        const deletedProject = await this.projectModel.findByIdAndRemove(id).exec();
        if (!deletedProject) {
            throw new Error('Project not found');
        }
        return deletedProject;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectService);
exports.ProjectService = ProjectService;
