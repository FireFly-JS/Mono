import 'reflect-metadata'

const Validator = (): ClassDecorator => {
  return (target) => {
    console.log('new class', target)
    if (!Reflect.hasMetadata('validator', target)) {
      Reflect.defineMetadata('validator', [], target)
    }
  }
}

const IsString = (): PropertyDecorator => {
  return (target, key) => {
    console.log('is string',target, target.constructor, key)
    const validators = Reflect.getMetadata('validator', target.constructor) || []
    validators.push({
      key,
      type: 'string'
    })
    Reflect.defineMetadata('validator', validators, target.constructor)
  }
}

@Validator()
class Test {
  @IsString()
  a: string
}

const test = new Test()
console.log(test.a)
console.log(Reflect.getMetadata('validator', Test))