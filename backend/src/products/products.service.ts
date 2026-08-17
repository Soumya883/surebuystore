import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Product } from './entities/product.entity';

export class CreateProductDto {
  title: string;
  slug: string;
  description?: string;
  price: number;
  mrp?: number;
  brandId?: string;
  categoryId?: string;
  images?: string[];
  condition?: string;
  storage?: string;
  ram?: string;
  stock?: number;
  rating?: number;
}

export class UpdateProductDto extends CreateProductDto {}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(dto);
    return this.productsRepository.save(product);
  }

  async findAll(query?: { category?: string; brand?: string; search?: string; minPrice?: number; maxPrice?: number; sort?: string }): Promise<Product[]> {
    const where: any = {};
    if (query?.search) where.title = Like(`%${query.search}%`);

    const options: FindManyOptions<Product> = {
      where,
      relations: { brand: true, category: true },
      order: query?.sort === 'price_asc' ? { price: 'ASC' }
           : query?.sort === 'price_desc' ? { price: 'DESC' }
           : query?.sort === 'newest' ? { createdAt: 'DESC' }
           : { createdAt: 'DESC' },
    };
    return this.productsRepository.find(options);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id }, relations: { brand: true, category: true } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { slug }, relations: { brand: true, category: true } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async seed(): Promise<Product[]> {
    const existing = await this.productsRepository.count();
    if (existing > 0) return [];

    const products = [
      { title: 'iPhone 14 Pro (128GB)', slug: 'iphone-14-pro-128gb', description: 'Excellent condition refurbished iPhone 14 Pro', price: 74999, mrp: 119900, images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400'], condition: 'Excellent', storage: '128GB', ram: '6GB', stock: 5, rating: 4.8 },
      { title: 'Samsung Galaxy S23 (256GB)', slug: 'samsung-galaxy-s23-256gb', description: 'Like new Samsung Galaxy S23', price: 54999, mrp: 74999, images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'], condition: 'Like New', storage: '256GB', ram: '8GB', stock: 8, rating: 4.6 },
      { title: 'OnePlus 12 (512GB)', slug: 'oneplus-12-512gb', description: 'Good condition OnePlus 12 flagship', price: 49999, mrp: 64999, images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'], condition: 'Good', storage: '512GB', ram: '12GB', stock: 3, rating: 4.5 },
      { title: 'Apple MacBook Air M2', slug: 'macbook-air-m2', description: 'Refurbished MacBook Air with M2 chip', price: 89999, mrp: 114900, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'], condition: 'Excellent', storage: '256GB', ram: '8GB', stock: 2, rating: 4.9 },
      { title: 'iPad Pro 11" (2022)', slug: 'ipad-pro-11-2022', description: 'Powerful iPad Pro for professionals', price: 64999, mrp: 81900, images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'], condition: 'Like New', storage: '128GB', ram: '8GB', stock: 4, rating: 4.7 },
      { title: 'Samsung Galaxy Tab S9', slug: 'samsung-galaxy-tab-s9', description: 'Premium Android tablet experience', price: 42999, mrp: 54999, images: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400'], condition: 'Good', storage: '128GB', ram: '8GB', stock: 6, rating: 4.4 },
    ];

    const saved: Product[] = [];
    for (const p of products) {
      const product = this.productsRepository.create(p);
      saved.push(await this.productsRepository.save(product));
    }
    return saved;
  }
}
