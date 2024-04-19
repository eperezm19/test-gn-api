// combo-product.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Combo } from './combo.entity';
import { Product } from 'src/products/entities';

@Entity('combo_products')
export class ComboProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Combo, (combo) => combo.products)
  combo: Combo;

  @ManyToOne(() => Product, (product) => product.comboProducts)
  product: Product;

  @Column('float')
  weightInPounds: number;
}
