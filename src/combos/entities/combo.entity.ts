import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComboProduct } from './combo-product.entity';

@Entity('combos')
export class Combo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', { default: 0 })
  price: number;

  @OneToMany(() => ComboProduct, (comboProduct) => comboProduct.combo)
  products: ComboProduct[];
}
