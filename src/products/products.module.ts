import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package, Product } from './entities';
import { ComboProduct } from 'src/combos/entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, Package, ComboProduct])],
})
export class ProductsModule {}
