/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Customer from '../infra/typeorm/entities/Customer'
import ICustomersRepository from '../repositories/ICustomersRepository'

interface IRequest {
  name: string
  email: string
}

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    // DONE
    const customerExists = await this.customersRepository.findByEmail(email)
    if (customerExists) {
      throw new AppError('This e-mail is already in use.')
    }
    const customer = await this.customersRepository.create({ name, email })
    return customer
  }
}
