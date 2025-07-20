import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PermissionService } from './permission.service';
import { Permission, PermissionType } from './permission.schema';
import { Model, Types } from 'mongoose';

describe('PermissionService', () => {
  let service: PermissionService;
  let model: Model<Permission>;

  beforeEach(async () => {
    const mockModel = {
      save: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getModelToken(Permission.name),
          useValue: {
            ...mockModel,
            findOne: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    model = module.get<Model<Permission>>(getModelToken(Permission.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a permission', async () => {
    const userId = new Types.ObjectId().toHexString();
    const companyId = new Types.ObjectId().toHexString();
    const type = PermissionType.Read;

    const saveMock = jest.fn().mockResolvedValue({ userId, companyId, type });
    (model as any).save = saveMock;

    (model as any).constructor = function (data: any) {
      return { ...data, save: saveMock };
    };

    const result = await service.addPermission(userId, companyId, type);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual({ userId, companyId, type });
  });

  it('should create admin permissions (read, write, admin)', async () => {
    const userId = new Types.ObjectId().toHexString();
    const companyId = new Types.ObjectId().toHexString();
    const type = PermissionType.Admin;

    const saveMock = jest.fn().mockResolvedValue({ userId, companyId, type });
    (model as any).save = saveMock;

    (model as any).constructor = function (data: any) {
      return { ...data, save: saveMock };
    };

    await service.addPermission(userId, companyId, type);
    expect(saveMock).toHaveBeenCalledTimes(3); // Read, Write, Admin
  });
});