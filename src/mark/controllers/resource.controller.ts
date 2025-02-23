import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResourceService } from '../services/resource.service';
import { ResourceDto } from '../dtos/user/resource.dto';
import { Resource } from '../entities/resource.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Private } from '../../auth/decorator/private.decorator';

@ApiTags('Resource')
@Private()
@ApiBearerAuth()
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  async list(): Promise<Resource[]> {
    return await this.resourceService.list();
  }

  @Get('/:id')
  async get(@Param('id') id: number): Promise<Resource> {
    return await this.resourceService.get(id);
  }

  @Post()
  async create(@Body() dto: ResourceDto): Promise<Resource> {
    return await this.resourceService.create(dto);
  }

  @Put(':id')
  async uodate(
    @Param('id') id: number,
    @Body() dto: ResourceDto,
  ): Promise<Resource> {
    return await this.resourceService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.resourceService.delete(id);
  }
}
