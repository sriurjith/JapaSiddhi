import {
  randomUUID,
} from 'crypto';

import {
  CreateOrderRequest,
  OrderStatus,
  PaymentStatus,
} from './order.types';

import orderRepository from './order.repository';

class OrderService {

  async create(
    data: CreateOrderRequest,
  ) {

    const orderNumber =
      `JS-${Date.now()}-${randomUUID()
        .substring(0, 6)
        .toUpperCase()}`;

    const id =
      await orderRepository.create(
        data,
        orderNumber,
      );

    return {
      id,
      orderNumber,
    };

  }

  async getById(
    id: number,
  ) {

    const order =
      await orderRepository.getById(
        id,
      );

    if (!order) {

      throw new Error(
        'Order not found',
      );

    }

    return order;

  }

  async getUserOrders(
    userId: number,
  ) {

    return orderRepository.getUserOrders(
      userId,
    );

  }

  async updateOrderStatus(
    id: number,
    status: OrderStatus,
  ) {

    await orderRepository.updateOrderStatus(
      id,
      status,
    );

    return {

      success: true,

    };

  }

  async updatePaymentStatus(
    id: number,
    status: PaymentStatus,
  ) {

    await orderRepository.updatePaymentStatus(
      id,
      status,
    );

    return {

      success: true,

    };

  }

}

export default new OrderService();