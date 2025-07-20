import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CompanyService } from './company.service';
import { Company } from './company.schema';
import { Model, Types } from 'mongoose';

describe('CompanyService', () => {
  let service: CompanyService;
  let model: Model<Company>;

  beforeEach(async () => {
    const mockModel = {
      save: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken(Company.name),
          useValue: {
            ...mockModel,
            findById: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    model = module.get<Model<Company>>(getModelToken(Company.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a company', async () => {
    const createCompanyDto = { name: 'Acme Corp', industry: 'Tech' };
    const saveMock = jest.fn().mockResolvedValue(createCompanyDto);
    (model as any).save = saveMock;
    (model as any).constructor = function (data: any) {
      return { ...data, save: saveMock };
    };

    const result = await service.createCompany(createCompanyDto);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual(createCompanyDto);
  });
});