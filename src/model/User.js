import mongoose from '../config/DBHelpler'
import moment from 'moment'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, index: { unique: true }, sparse: true }, //	否		//邮箱
  password: { type: String }, //	否		//密码
  name: { type: String }, //	否		//昵称
  created: { type: Date }, //	否	now()	//注册时间
  updated: { type: Date }, //	否	now()	//更新时间
  favs: { type: Number, default: 100 }, //	否	100	//用户积分
  gender: { type: String, default: '' }, //	否	0	默认 0男 //1女
  roles: { type: Array, default: ['user'] }, //	否	user	角色，user-普通用户，admin-管理员，super_admin - //超级管理员
  pic: { type: String, default: '' }, //	否		//用户头像
  mobile: { type: String, match: /^1[3-9]\d{9}$/, default: '' }, //	否		//手机号码
  status: { type: String, default: '0' }, //	否	0	是否被禁用 0-正常，1-禁言，2-//账号禁用
  regmark: { type: String, default: '' }, // 签名
  location: { type: String, default: '' }, //	否		//城市
  isVip: { type: String, default: '0' }, //	否	0	是否是vip用户 0-普通用户，1-会员用户， 2-//7会员等级
  count: { type: Number, default: 0 }, //	否	0	//签到次数
})

UserSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.pre('update', function (next) {
  this.updated = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.pre('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error:Mongoose has a duplicate key.'))
  } else {
    next()
  }
})

UserSchema.statics = {
  findByID(id) {
    return this.findOne(
      { _id: id },
      {
        password: 0,
        username: 0,
        mobile: 0,
      }
    )
  },
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
