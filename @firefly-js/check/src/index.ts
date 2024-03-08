import 'reflect-metadata'
import Validator, { Required } from './decorators/base'
import { IsString } from './decorators/string'
import BaseValidator from './validator/base'
import { IsBoolean } from './decorators/boolean'
import ObjectValidator from './validator/object'


@Validator({required:true})
class Test {
  @IsString()
  @Required()
  a: string

  @IsBoolean()
  @Required()
  b: boolean
}

const validator: ObjectValidator = Reflect.getMetadata('validator', Test)
console.log(JSON.stringify(validator.getSchema(), null, 4))
console.log(validator.trigger({
  a: '12',
  b: '123'
}))