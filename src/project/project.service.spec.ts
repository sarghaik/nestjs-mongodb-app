import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectService } from './project.service';
import { Project, ProjectStatus, ProjectPriority } from './project.schema';
import { Model, Types } from 'mongoose';

describe('ProjectService', () => {
  let service: ProjectService;
  let model: Model<Project>;

  beforeEach(async () => {
    const mockModel = {
      save: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getModelToken(Project.name),
          useValue: {
            ...mockModel,
            findById: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    model = module.get<Model<Project>>(getModelToken(Project.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const createProjectDto = {
      name: 'Project Alpha',
      description: 'Test project',
      status: ProjectStatus.Active,
      priority: ProjectPriority.High,
      tags: ['nestjs', 'mongo'],
      companyId: new Types.ObjectId().toHexString(),
    };
    const saveMock = jest.fn().mockResolvedValue(createProjectDto);
    (model as any).save = saveMock;
    (model as any).constructor = function (data: any) {
      return { ...data, save: saveMock };
    };

    const result = await