import {
  Controller, Get, Post, Patch, Param, Body, UseGuards, Delete
} from '@nestjs/common';
import { OrdersService, CreateOrderDto } from './orders.service';
import { OrderStatus, PaymentMethod } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /orders — Place a new order (COD or prepaid)
  @Post()
  createOrder(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(user.userId, dto);
  }

  // GET /orders — Get current user's orders
  @Get()
  getMyOrders(@CurrentUser() user: any) {
    return this.ordersService.getUserOrders(user.userId);
  }

  // GET /orders/:id — Get specific order
  @Get(':id')
  getOrder(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.getOrderById(id, user.userId);
  }

  // PATCH /orders/:id/cancel — Cancel an order
  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.cancelOrder(id, user.userId);
  }

  // ─── Admin Only Routes ───────────────────────────────────────────────

  // GET /orders/admin/all — Get all orders (admin)
  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  // PATCH /orders/admin/:id/status — Update order status (admin)
  @Patch('admin/:id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateOrderStatus(id, status);
  }
}
