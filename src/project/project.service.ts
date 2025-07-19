import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async createProject(createProjectDto: any): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findProjects(companyId: string): Promise<Project[]> {
    return this.projectModel.find({ companyId }).exec();
  }

  async updateProject(id: string, updateProjectDto: any): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
    if (!updatedProject) {
      throw new Error('Project not found');
    }
    return updatedProject;
  }

  async deleteProject(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndRemove(id).exec();
    if (!deletedProject) {
      throw new Error('Project not found');
    }
    return deletedProject;
  }
}