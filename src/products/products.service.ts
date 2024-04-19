import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package, Product } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const packageItem = await this.packageRepository.findOneBy({
        id: createProductDto.package,
      });

      if (!packageItem) {
        throw new NotFoundException('Package not found');
      }

      const product = this.productRepository.create({
        ...createProductDto,
        package: packageItem,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { package: packageId, ...toUpdate } = updateProductDto;

    const packageItem = await this.findPackageById(packageId);
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (!packageItem) {
      throw new NotFoundException('Package not found');
    }

    const updatedProduct = this.productRepository.merge(product, toUpdate, {
      package: packageItem,
    });

    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async findPackageById(id: number) {
    return await this.packageRepository.findOneBy({ id });
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
