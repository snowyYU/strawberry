import mongoose from '../config/DBHelpler'
import moment from 'moment'

const Schema = mongoose.Schema

const LinksSchema = new Schema({
  title: { type: String, default: '' }, //	否		标题
  link: { type: String, default: '' }, //	否		链接
  created: { type: Date }, //	否		创建时间
  isTop: { type: String, default: '' }, //	是	0	是否置顶
  sort: { type: String, default: '' }, //	否	0	排序编号
})

LinksSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

// LinksSchema.statics = {
//   /**
//    * 获取友链数据
//    * @param {Object} options
//    * @param {String} sort
//    * @param {Number} page
//    * @param {Number} limit
//    */
//   getList(options, sort, page, limit) {
//     return this.find(options)
//       .sort({ [sort]: -1 })
//       .skip(page * limit)
//       .limit(limit)
//   },
// }

const Links = mongoose.model('links', LinksSchema)

export default Links
