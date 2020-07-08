import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
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
    checkCode(sid, code)
    let token = jsonwebtoken.sign({ _id: 'jasper' }, config.JWT_SECRET, { expiresIn: '1h' })
    ctx.body = {
      code: 200,
      token: token,
    }
  }
}

export default new LoginController()
