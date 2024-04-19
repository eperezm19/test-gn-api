import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateComboDto } from './dto/create-combo.dto';
// import { UpdateComboDto } from './dto/update-combo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Combo, ComboProduct } from './entities';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities';

@Injectable()
export class CombosService {
  private readonly logger = new Logger('CombosService');

  constructor(
    @InjectRepository(Combo)
    private comboRepository: Repository<Combo>,
    @InjectRepository(ComboProduct)
    private comboProductsRepository: Repository<ComboProduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createComboDto: CreateComboDto) {
    try {
      const combo = this.comboRepository.create({
        name: createComboDto.name,
        description: createComboDto.description,
        price: createComboDto.price,
      });

      await this.comboRepository.save(combo);

      for (const productDto of createComboDto.products) {
        const product = await this.productRepository.findOneBy({
          id: productDto.productId,
        });

        if (!product) {
          throw new NotFoundException(
            `Product with id ${productDto.productId} not found`,
          );
        }

        const comboProduct = this.comboProductsRepository.create({
          combo,
          product,
          weightInPounds: productDto.weightInPounds,
        });

        await this.comboProductsRepository.save(comboProduct);
      }

      return combo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.comboRepository.find({
      relations: ['products', 'products.product'],
    });
  }

  async findOne(id: string) {
    const combo = await this.comboRepository.findOneBy({ id });

    if (!combo) {
      throw new NotFoundException(`Combo with id ${id} not found`);
    }

    return combo;
  }

  // update(id: number, updateComboDto: UpdateComboDto) {
  //   return `This action updates a #${id} combo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} combo`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
