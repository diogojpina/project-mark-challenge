import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ResourceType } from 'src/mark/enum/resource.type.enum';

export class ResourceDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  topicId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: ResourceType })
  @IsEnum(ResourceType)
  role: ResourceType;
}
