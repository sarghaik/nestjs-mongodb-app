import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.schema';

//TODO: Update any to specific DTOs as needed

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {
    console.log('CompanyService initialized with model:', this.companyModel);
  }

  async createCompany(createCompanyDto: any): Promise<any> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findCompany(id: string): Promise<any> {
    const company = await this.companyModel.findById(id, '_id name industry').lean().exec();
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  async updateCompany(id: string, updateCompanyDto: any): Promise<any> {
    const updatedCompany = await this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true }).select('_id name industry').lean().exec();
    if (!updatedCompany) {
      throw new Error('Company not found');
    }
    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<Company> {
    const deletedCompany = await this.companyModel.findByIdAndRemove(id).exec();
    if (!deletedCompany) {
      throw new Error('Company not found');
    }
    return deletedCompany;
  }
}