import { getValue } from '../config/RedisConfig'

const checkCode = (key, value) => {
  getValue(key)
}
