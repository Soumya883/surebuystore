import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  mrp: number;

  @ManyToOne(() => Brand, { nullable: true })
  brand: Brand;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ nullable: true })
  condition: string;

  @Column({ nullable: true })
  storage: string;

  @Column({ nullable: true })
  ram: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0, type: 'float' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
