import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IProductsRepository from '@modules/products/repositories/IProductsRepository'
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository'
import Order from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../repositories/IOrdersRepository'

interface IProduct {
  id: string
  quantity: number
}

interface IRequest {
  customer_id: string
  products: IProduct[]
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    // DONE
    const customer = await this.customersRepository.findById(customer_id)
    if (!customer) {
      throw new AppError('Customer does not exist.')
    }
    const productsIds = products.map(product => {
      return { id: product.id }
    })
    const existingProducts = await this.productsRepository.findAllById(
      productsIds,
    )
    if (!existingProducts.length) {
      throw new AppError('Products does not exist.')
    }
    const productsList = existingProducts.map(product => {
      const productFind = products.find(p => p.id === product.id)
      return {
        product_id: product.id,
        quantity: productFind?.quantity || 0,
        price: product.price,
      }
    })
    const order = await this.ordersRepository.create({
      customer,
      products: productsList,
    })
    existingProducts.map(product => {
      const productFind = products.find(p => p.id === product.id)
      if (!productFind) {
        throw new AppError('Product not found')
      }
      if (product.quantity < productFind.quantity) {
        throw new AppError('Insufficient product quantity')
      }
      const productQuantity = product
      productQuantity.quantity -= productFind.quantity
      return productQuantity
    })
    await this.productsRepository.updateQuantity(existingProducts)
    return order
  }
}
