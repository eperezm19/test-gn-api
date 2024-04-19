import { Module } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CombosController } from './combos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from './entities/combo.entity';
import { ComboProduct } from './entities';
import { Product } from 'src/products/entities';

@Module({
  controllers: [CombosController],
  providers: [CombosService],
  imports: [TypeOrmModule.forFeature([Combo, ComboProduct, Product])],
})
export class CombosModule {}
