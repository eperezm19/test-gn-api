import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateComboDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsArray({ each: true })
  @ArrayNotEmpty()
  products: CreateComboProductDto[];
}

export class CreateComboProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  weightInPounds: number;
}
