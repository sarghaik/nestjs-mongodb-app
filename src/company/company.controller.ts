import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@ApiTags('company')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findCompany(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: CreateCompanyDto) {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companyService.deleteCompany(id);
  }
}