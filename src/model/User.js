import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String }, //	否		//邮箱
  password: { type: String }, //	否		//密码
  name: { type: String }, //	否		//昵称
  created: { type: Date }, //	否	now()	//注册时间
  updated: { type: Date }, //	否	now()	//更新时间
  favs: { type: Number }, //	否	100	//用户积分
  gender: { type: String }, //	否	0	默认 0男 //1女
  roles: { type: String }, //	否	user	角色，user-普通用户，admin-管理员，super_admin - //超级管理员
  pic: { type: String }, //	否		//用户头像
  mobile: { type: String }, //	否		//手机号码
  status: { type: String }, //	否	0	是否被禁用 0-正常，1-禁言，2-//账号禁用
  location: { type: String }, //	否		//城市
  isVip: { type: String }, //	否	0	是否是vip用户 0-普通用户，1-会员用户， 2-//7会员等级
  count: { type: Number }, //	否	0	//签到次数
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
