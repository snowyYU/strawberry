import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode } from '../common/Utils'
import User from '../model/User'
class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request
    try {
      let result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'jasper',
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功',
      }
    } catch (e) {
      console.log(e)
    }
  }
  async login(ctx) {
    // 接受用户的数据
    // 验证图片验证码的时效性，正确行
    // 验证用户账号密码是否正确
    // 返回token
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    if (sid && checkCode(sid, code)) {
      // 验证密码
      console.log('check pass')
      let checkUserPwd = ''
      let user = await User.findOne({ username: body.username })
      if (user.password === body.password) {
        checkUserPwd = true
      }
      if (checkUserPwd) {
        let token = jsonwebtoken.sign({ _id: 'jasper' }, config.JWT_SECRET, { expiresIn: '1h' })
        ctx.body = {
          code: 200,
          token: token,
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '用户名密码错误',
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确',
      }
    }
  }
}

export default new LoginController()
