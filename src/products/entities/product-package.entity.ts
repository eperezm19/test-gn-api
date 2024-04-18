import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'packages' })
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @Column('float')
  weight: number;

  @OneToMany(() => Product, (product) => product.package)
  products: Product[];
}
