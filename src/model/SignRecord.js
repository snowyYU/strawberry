import mongoose from '../config/DBHelpler'
import moment from 'moment'
const Schema = mongoose.Schema

const SignRecordSchema = new Schema({
  uid: { type: String, ref: 'users' },
  created: { type: Date },
  lastSign: { type: Date }, // 最后签到时间
  favs: { type: Number }, // 用户获得的积分
})

SignRecordSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

const SignRecordModel = mongoose.model('sign_record', SignRecordSchema)

export default SignRecordModel
