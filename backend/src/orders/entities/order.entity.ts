import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING_COD = 'PENDING_COD',         // 0% upfront - COD placed, not yet confirmed
  CONFIRMED_COD = 'CONFIRMED_COD',     // Delivery partner confirmed COD
  PAYMENT_PENDING = 'PAYMENT_PENDING', // Prepaid order - awaiting Razorpay
  PAYMENT_DONE = 'PAYMENT_DONE',       // Prepaid payment confirmed
  PROCESSING = 'PROCESSING',           // Warehouse picking & packing
  SHIPPED = 'SHIPPED',                 // Out for delivery
  DELIVERED = 'DELIVERED',             // Delivered successfully
  CANCELLED = 'CANCELLED',             // Cancelled
  RETURN_REQUESTED = 'RETURN_REQUESTED',
  RETURNED = 'RETURNED',
}

export enum PaymentMethod {
  COD = 'COD',
  RAZORPAY = 'RAZORPAY',
  UPI = 'UPI',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items: OrderItem[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_COD })
  status: OrderStatus;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod: PaymentMethod;

  @Column('decimal', { default: 0 })
  totalAmount: number;

  @Column('decimal', { default: 0 })
  amountPaid: number; // 0 for COD until delivery

  @Column({ nullable: true })
  razorpayOrderId: string;

  @Column({ nullable: true })
  razorpayPaymentId: string;

  // Delivery Address (stored as JSON snapshot)
  @Column({ type: 'jsonb', nullable: true })
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  @Column({ nullable: true })
  deliveryNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
