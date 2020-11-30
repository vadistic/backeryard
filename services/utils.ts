import { plainToClass } from 'class-transformer'

export type ClassType<T> = new (...args: any) => T

export function converter<T>(classRef: ClassType<T>) {
  return (value: any) => plainToClass(classRef, value)
}
