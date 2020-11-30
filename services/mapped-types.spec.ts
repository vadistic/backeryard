import { plainToClass } from 'class-transformer'
import { IsNumber, IsString, Length, validateSync } from 'class-validator'

import { OmitType, PartialType } from './mapped-types'

describe('mapped types', () => {
  class Model {
    @IsString()
    id: string

    @IsString()
    @Length(2, 10)
    name: string

    @IsNumber()
    price: number
  }

  class CreateInput extends OmitType(Model, ['id']) {}

  class UpdateInput extends PartialType(CreateInput) {}

  test('model ok', () => {
    const clz = plainToClass(Model, { id: '123', name: 'ABC', price: 1 })

    const err = validateSync(clz)

    expect(err.length).toBe(0)
  })

  test('model err', () => {
    const clz = plainToClass(Model, { name: 'ABC', price: 1 })

    const err = validateSync(clz)

    expect(err[0]?.property).toBe('id')
  })

  test('partial ok', () => {
    const clz = plainToClass(UpdateInput, { name: 'ASD' })

    const err = validateSync(clz)

    expect(err.length).toBe(0)
  })

  test('partial err', () => {
    const clz = plainToClass(UpdateInput, { name: 1 })

    const err = validateSync(clz)

    expect(err[0]?.property).toBe('name')
  })

  test('omit ok', () => {
    const clz = plainToClass(CreateInput, { name: 'ABC', price: 1 })

    const err = validateSync(clz)

    expect(err.length).toBe(0)
  })

  test('omit err', () => {
    const clz = plainToClass(CreateInput, { price: 1 })

    const err = validateSync(clz)

    expect(err[0]?.property).toBe('name')
  })
})
