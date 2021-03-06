import Router from 'koa-router'
import publicController from '../api/PublicController'
import contentController from '../api/ContentController'

const router = new Router()

router.prefix('/public')

// 获取验证码
router.get('/getCaptcha', publicController.getCaptcha)
// 获取文章列表
router.get('/list', contentController.getPostList)
// 获取友链
router.get('/links', contentController.getLinks)
// 温馨提醒
router.get('/tips', contentController.getTips)
// 温馨提醒
router.get('/topWeek', contentController.getTopWeek)
export default router
