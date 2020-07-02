import mongoose from 'mongoose'
import config from './index'
mongoose.connect(config.DB_URL, { useNewUrlParser: true })

// 连接成功

mongoose.connection.on('connected', () => {
  console.log('mongoose connection open to ' + config.DB_URL)
})
// 连接异常

mongoose.connection.on('error', (err) => {
  console.log('mongoose connection error ' + err)
})
// 连接断开

mongoose.connection.on('disconnected', () => {
  console.log('mongoose connection disconnected')
})

export default mongoose
