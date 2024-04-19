import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from './product-package.entity';
import { ComboProduct } from 'src/combos/entities';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('float')
  stock: number;

  @Column('float', { default: 0 })
  pricePerPound: number;

  @ManyToOne(() => Package, (productPackage) => productPackage.products)
  package: Package;

  @OneToMany(() => ComboProduct, (comboProduct) => comboProduct.product)
  comboProducts: ComboProduct[];
}
