import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  pricePerPound: number;

  @IsNumber()
  @IsPositive()
  package: number;
}
