import { defaultMetadataStorage as classTransformerMetadataStorage } from 'class-transformer/storage'
import { IsOptional, getMetadataStorage as getClassValidatorMetadataStorage } from 'class-validator'

import { ClassType } from './utils'

/*
 * based on
 * https://github.com/nestjs/mapped-types/blob/master/lib/type-helpers.utils.ts
 */

export function applyIsOptionalDecorator(targetClass: ClassType<any>, propertyKey: string) {
  const decoratorFactory = IsOptional()

  decoratorFactory(targetClass.prototype, propertyKey)
}

export function inheritValidationMetadata(
  parentClass: ClassType<any>,
  targetClass: ClassType<any>,
  isPropertyInherited?: (key: string) => boolean,
) {
  try {
    const metadataStorage = getClassValidatorMetadataStorage()

    const targetMetadata = metadataStorage.getTargetValidationMetadatas(
      parentClass,
      (null as unknown) as string,
    )

    return targetMetadata
      .filter(({ propertyName }) => !isPropertyInherited || isPropertyInherited(propertyName))
      .map(value => {
        metadataStorage.addValidationMetadata({
          ...value,
          target: targetClass,
        })
        return value.propertyName
      })
  } catch (err) {
    console.error(`"class-validator" metadata cannot be inherited for "${parentClass.name}" class.`)

    throw err
  }
}

type TransformMetadataKey =
  | '_excludeMetadatas'
  | '_exposeMetadatas'
  | '_typeMetadatas'
  | '_transformMetadatas'

export function inheritTransformationMetadata(
  parentClass: ClassType<any>,
  targetClass: ClassType<any>,
  isPropertyInherited?: (key: string) => boolean,
) {
  try {
    const transformMetadataKeys: TransformMetadataKey[] = [
      '_excludeMetadatas',
      '_exposeMetadatas',
      '_transformMetadatas',
      '_typeMetadatas',
    ]
    transformMetadataKeys.forEach(key =>
      inheritTransformerMetadata(key, parentClass, targetClass, isPropertyInherited),
    )
  } catch (err) {
    console.error(
      `"class-transformer" metadata cannot be inherited for "${parentClass.name}" class.`,
    )

    throw err
  }
}

function inheritTransformerMetadata(
  key: TransformMetadataKey,
  parentClass: ClassType<any>,
  targetClass: ClassType<any>,
  isPropertyInherited?: (key: string) => boolean,
) {
  const metadataStorage = classTransformerMetadataStorage

  while (parentClass && parentClass !== Object) {
    if (metadataStorage[key].has(parentClass)) {
      const metadataMap = metadataStorage[key] as Map<ClassType<any>, Map<string, any>>

      const parentMetadata = metadataMap.get(parentClass)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const targetMetadataEntries: Iterable<[string, any]> = Array.from(parentMetadata!.entries())
        .filter(([key]) => !isPropertyInherited || isPropertyInherited(key))
        .map(([key, metadata]) => {
          if (Array.isArray(metadata)) {
            // "_transformMetadatas" is an array of elements
            const targetMetadata = metadata.map(item => ({
              ...item,
              target: targetClass,
            }))

            return [key, targetMetadata]
          }
          return [key, { ...metadata, target: targetClass }]
        })

      if (metadataMap.has(targetClass)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const existingRules = metadataMap.get(targetClass)!.entries()
        metadataMap.set(targetClass, new Map([...existingRules, ...targetMetadataEntries]))
      } else {
        metadataMap.set(targetClass, new Map(targetMetadataEntries))
      }
    }
    parentClass = Object.getPrototypeOf(parentClass)
  }
}

export function inheritPropertyInitializers(
  target: Record<string, any>,
  sourceClass: ClassType<any>,
  isPropertyInherited = (_key: string) => true,
) {
  try {
    const tempInstance = new sourceClass()
    const propertyNames = Object.getOwnPropertyNames(tempInstance)

    propertyNames
      .filter(
        propertyName =>
          typeof tempInstance[propertyName] !== 'undefined' &&
          typeof target[propertyName] === 'undefined',
      )
      .filter(propertyName => isPropertyInherited(propertyName))
      .forEach(propertyName => {
        target[propertyName] = tempInstance[propertyName]
      })
  } catch {
    // noop
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export function PartialType<T>(classRef: ClassType<T>): ClassType<Partial<T>> {
  abstract class PartialClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef)
    }
  }

  const propertyKeys = inheritValidationMetadata(
    classRef,
    PartialClassType as ClassType<PartialClassType>,
  )

  inheritTransformationMetadata(classRef, PartialClassType as ClassType<PartialClassType>)

  if (propertyKeys) {
    propertyKeys.forEach(key => {
      applyIsOptionalDecorator(PartialClassType as ClassType<PartialClassType>, key)
    })
  }

  Object.defineProperty(PartialClassType, 'name', {
    value: `Partial${classRef.name}`,
  })

  return PartialClassType as ClassType<Partial<T>>
}

// ────────────────────────────────────────────────────────────────────────────────

export function PickType<T, K extends keyof T>(
  classRef: ClassType<T>,
  keys: readonly K[],
): ClassType<Pick<T, typeof keys[number]>> {
  const isInheritedPredicate = (propertyKey: string) => keys.includes(propertyKey as K)

  abstract class PickClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate)
    }
  }

  inheritValidationMetadata(
    classRef,
    PickClassType as ClassType<PickClassType>,
    isInheritedPredicate,
  )

  inheritTransformationMetadata(
    classRef,
    PickClassType as ClassType<PickClassType>,
    isInheritedPredicate,
  )

  Object.defineProperty(PickClassType, 'name', {
    value: `Pick${classRef.name}`,
  })

  return PickClassType as ClassType<Pick<T, typeof keys[number]>>
}

// ────────────────────────────────────────────────────────────────────────────────

export function OmitType<T, K extends keyof T>(
  classRef: ClassType<T>,
  keys: readonly K[],
): ClassType<Omit<T, typeof keys[number]>> {
  const isInheritedPredicate = (propertyKey: string) => !keys.includes(propertyKey as K)

  abstract class OmitClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate)
    }
  }

  inheritValidationMetadata(
    classRef,
    OmitClassType as ClassType<OmitClassType>,
    isInheritedPredicate,
  )

  inheritTransformationMetadata(
    classRef,
    OmitClassType as ClassType<OmitClassType>,
    isInheritedPredicate,
  )

  return OmitClassType as ClassType<Omit<T, typeof keys[number]>>
}
