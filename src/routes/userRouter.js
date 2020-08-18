import Router from 'koa-router'
import userControllerr from '../api/UserController'

const router = new Router()

router.prefix('/user')

// 用户签到
router.get('/fav', userControllerr.userSign)

export default router
