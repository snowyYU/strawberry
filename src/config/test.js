import { getValue, setValue, getHValue } from './RedisConfig'

setValue('tiantian', 'message be created by node and saved by redis')
getValue('tiantian').then((res) => {
  console.log(res)
})

setValue('tiantianObj', { name: 'tian1', age: 8, email: 'tian1@gmail.com' })

getHValue('tiantianObj').then((res) => {
  console.log(res)
})
