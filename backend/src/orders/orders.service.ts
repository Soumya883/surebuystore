import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentMethod } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { UsersService } from '../users/users.service';

export class CreateOrderDto {
  items: { productId: string; quantity: number }[];
  paymentMethod: PaymentMethod;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryNotes?: string;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private usersService: UsersService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of dto.items) {
      const product = await this.productsRepository.findOne({ where: { id: item.productId } });
      if (!product) throw new NotFoundException(`Product ${item.productId} not found`);

      const orderItem = this.orderItemsRepository.create({
        product,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
      totalAmount += Number(product.price) * item.quantity;
      orderItems.push(orderItem);
    }

    const isCOD = dto.paymentMethod === PaymentMethod.COD;
    const advanceAmount = isCOD ? Math.round(totalAmount * 0.1) : 0;

    const order = this.ordersRepository.create({
      user,
      items: orderItems,
      status: isCOD ? OrderStatus.PENDING_COD : OrderStatus.PAYMENT_PENDING,
      paymentMethod: dto.paymentMethod,
      totalAmount,
      amountPaid: advanceAmount, // 10% advance deposit for COD, rest on delivery
      shippingAddress: dto.shippingAddress,
      deliveryNotes: dto.deliveryNotes,
    });

    return this.ordersRepository.save(order);
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(orderId: string, userId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.user.id !== userId) throw new ForbiddenException('Access denied');
    return order;
  }

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    const order = await this.getOrderById(orderId, userId);
    const cancellableStatuses = [OrderStatus.PENDING_COD, OrderStatus.PAYMENT_PENDING];
    if (!cancellableStatuses.includes(order.status)) {
      throw new ForbiddenException('Order cannot be cancelled at this stage');
    }
    order.status = OrderStatus.CANCELLED;
    return this.ordersRepository.save(order);
  }

  // Admin: Get all orders
  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({ order: { createdAt: 'DESC' } });
  }

  // Admin: Update order status
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status;
    return this.ordersRepository.save(order);
  }
}
