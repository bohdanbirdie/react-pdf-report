import { BaseBlock, Identifier } from '@react-pdf/components';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

export class BaseBlockDTO
  implements Omit<BaseBlock<unknown, string>, 'Component' | 'items'>
{
  @ApiProperty({ enum: Identifier })
  @IsNotEmpty()
  @IsEnum(Identifier)
  public readonly identifier: Identifier;

  @ApiProperty({
    type: 'object',
    description: 'Metadata object is dependant on the type of block'
  })
  @IsOptional()
  @IsObject()
  public metadata?: unknown;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  public accessor?: never;

  @Type(() => BaseBlockDTO)
  @ValidateNested()
  @IsArray()
  @ApiProperty({
    type: 'object',
    isArray: true,
    // https://github.com/swagger-api/swagger-ui/issues/3325
    description: 'BaseBlockDTO',
    example: [
      {
        identifier: Identifier.Title,
        accessor: 'firstName',
        metadata: {
          theme: 'h2'
        }
      }
    ]
  })
  public items: BaseBlockDTO[] = [];

  @IsEmpty()
  @ApiHideProperty()
  Component: never;
}
