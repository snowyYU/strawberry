import send from '../config/MailConfig'
import bcrypt from 'bcrypt'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode } from '../common/Utils'
import User from '../model/User'
class LoginController {
  async forget(ctx) {
    const { body } = ctx.request
    try {
      const result = await send({
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
    const sid = body.sid
    const code = body.code
    const result = await checkCode(sid, code)
    if (sid && result) {
      // 验证密码
      console.log('check pass')
      let checkUserPwd = ''
      // 查询mongoDB
      const user = await User.findOne({ username: body.username })
      if (await bcrypt.compare(body.password, user.password)) {
        checkUserPwd = true
      }
      if (checkUserPwd) {
        const token = jsonwebtoken.sign({ _id: 'jasper' }, config.JWT_SECRET, {
          expiresIn: '1h',
        })
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

  async reg(ctx) {
    // 接收客户端数据
    const { body } = ctx.request
    // 校验验证码
    const sid = body.sid
    const code = body.code
    const msg = {}
    const result = await checkCode(sid, code)
    let check = true
    if (result) {
      // 查库 username 是否被注册
      const user1 = await User.findOne({ username: body.username })
      if (user1 !== null && typeof user1.username !== 'undefined') {
        msg.username = ['该邮箱已经注册，可以通过邮箱找回密码']
        check = false
      }
      // 查库 name 是否被注册
      const user2 = await User.findOne({ name: body.name })
      if (user2 !== null && typeof user2.name !== 'undefined') {
        msg.username = ['此昵称已被注册']
        check = false
      }

      // 写入到数据库
      if (check) {
        body.password = await bcrypt.hash(body.password, 5)
        const user = new User({
          username: body.username,
          name: body.name,
          password: body.password,
          created: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        const result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: 'success',
        }
        return
      }
    } else {
      msg.code = ['验证码已经失效，重新获取']
    }
    ctx.body = {
      code: 500,
      // data: result,
      msg: msg,
    }
  }
}

export default new LoginController()
