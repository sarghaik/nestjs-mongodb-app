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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const company_schema_1 = require("./company.schema");
let CompanyService = class CompanyService {
    constructor(companyModel) {
        this.companyModel = companyModel;
        console.log('CompanyService initialized with model:', this.companyModel);
    }
    async createCompany(createCompanyDto) {
        const createdCompany = new this.companyModel(createCompanyDto);
        return createdCompany.save();
    }
    async findCompany(id) {
        const company = await this.companyModel.findById(id).exec();
        if (!company) {
            throw new Error('Company not found');
        }
        return company;
    }
    async updateCompany(id, updateCompanyDto) {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true }).exec();
        if (!updatedCompany) {
            throw new Error('Company not found');
        }
        return updatedCompany;
    }
    async deleteCompany(id) {
        const deletedCompany = await this.companyModel.findByIdAndRemove(id).exec();
        if (!deletedCompany) {
            throw new Error('Company not found');
        }
        return deletedCompany;
    }
};
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CompanyService);
exports.CompanyService = CompanyService;
