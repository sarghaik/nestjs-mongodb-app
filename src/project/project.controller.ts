import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { PermissionGuard } from '../permission/permission.guard';
import { Permission } from '../permission/permission.decorator';
import { PermissionType } from '../permission/permission.schema';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('project')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Permission(PermissionType.Read)
  @Get(':companyId')
  async findOne(@Param('companyId') companyId: string) {
    return this.projectService.findProjects(companyId);
  }

  @Permission(PermissionType.Write)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Permission(PermissionType.Write)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: CreateProjectDto) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Permission(PermissionType.Delete)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}