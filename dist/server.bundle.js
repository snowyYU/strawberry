!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=22)}([function(e,t,o){"use strict";t.a={DB_URL:"mongodb://test:123456@39.98.151.75:8199/testdb",JWT_SECRET:"secret"}},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("moment")},function(e,t){e.exports=require("koa-router")},function(e,t){e.exports=require("redis")},function(e,t){e.exports=require("bcrypt")},function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("koa-jwt")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("koa-helmet")},function(e,t){e.exports=require("koa-static")},function(e,t){e.exports=require("koa-combine-routers")},function(e,t){e.exports=require("svg-captcha")},function(e,t){e.exports=require("nodemailer")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("koa-body")},function(e,t){e.exports=require("koa-json")},function(e,t){e.exports=require("@koa/cors")},function(e,t){e.exports=require("koa-compose")},function(e,t){e.exports=require("koa-compress")},function(e,t,o){"use strict";t.a=(e,t)=>t().catch(t=>{401===t.status?(e.status=401,e.body={code:401,message:"Protected resource, use Authorization header to get access\n"}):(e.status=t.status||500,e.body=Object.assign({code:500,msg:t.message},{}))})},function(e,t,o){"use strict";var n=o(11),r=o.n(n),s=o(3),a=o.n(s),i=o(12),c=o.n(i),u=o(4),d=o.n(u);const p={host:"39.98.151.75",port:8200,password:"123456",detect_buffer:!0,retry_strategy:function(e){return e.error&&"ECONNREFUSED"===e.error.code?new Error("The server refused the connection"):e.total_retry_time>36e5?new Error("Retry time exhausted"):e.attempt>10?void 0:Math.min(100*e.attempt,3e3)}},l=d.a.createClient(p);l.on("error",(function(e){console.error("连接失败",e)}));const{promisify:g}=o(23),f=g(l.get).bind(l);var m=new class{async getCaptcha(e){const t=e.request.query,o=c.a.create({size:4,ignoreChars:"0o1il",color:!0,noise:Math.floor(5*Math.random()),width:150,height:38});var n,r,s;n=t.sid,r=o.text,s=600,void 0!==r&&null!=r&&""!==r&&("string"==typeof r?void 0!==s?l.set(n,r,"EX",s):l.set(n,r):"object"==typeof r&&Object.keys(r).forEach(e=>{l.hset(n,e,r[e],d.a.print)})),e.body={code:200,data:o.data}}},y=o(1),b=o.n(y),h=o(0);b.a.connect(h.a.DB_URL,{useNewUrlParser:!0,useUnifiedTopology:!0}),b.a.connection.on("connected",()=>{console.log("mongoose connection open to "+h.a.DB_URL)}),b.a.connection.on("error",e=>{console.log("mongoose connection error "+e)}),b.a.connection.on("disconnected",()=>{console.log("mongoose connection disconnected")});var v=b.a,x=o(2),w=o.n(x);const q=new(0,v.Schema)({uid:{type:String,ref:"users"},title:{type:String},content:{type:String},created:{type:Date},catalog:{type:String},fav:{type:String},isEnd:{type:String,default:"0"},reads:{type:Number,default:0},answer:{type:Number,default:0},status:{type:String,default:"0"},isTop:{type:String,default:"0"},sort:{type:String,default:100},tags:{type:Array}});q.pre("save",(function(e){this.created=w()().format("YYYY-MM-DD HH:mm:ss"),e()})),q.statics={getList(e,t,o,n){return this.find(e).sort({[t]:-1}).skip(o*n).limit(n).populate({path:"uid",select:"name"})}};var S=v.model("posts",q);var k=new class{async getPostList(e){const t=e.query,o=t.sort?t.sort:"created",n=t.page?parseInt(t.page):0,r=t.limit?parseInt(t.limit):20,s={};void 0!==t.catalog&&""!==t.catalog&&(s.catalog=t.catalog),void 0!==t.isTop&&(s.isTop=t.isTop),void 0!==t.status&&(s.status=t.status),void 0!==t.isEnd&&(s.isEnd=t.isEnd),void 0!==t.tag&&""!==t.tag&&(s.tags={$elemMatch:{name:t.tag}});const a=await S.getList(s,o,n,r);e.body={code:200,data:a,msg:"获取列表成功"}}};const j=new a.a;j.prefix("/public"),j.get("/getCaptcha",m.getCaptcha),j.get("/list",k.getPostList);var E=j,_=o(13),M=o.n(_);var T=async function(e){const t=M.a.createTransport({host:"smtp.qq.com",port:587,secure:!1,auth:{user:"731444920@qq.com",pass:"raikqmpowrklbbdj"}});return"Message sent: %s, "+(await t.sendMail({from:'"Fred Foo 👻" <731444920@qq.com>',to:e.email,subject:""!==e.user?"hi,"+e.user:"hi~",text:`邀请码为${e.code},邀请码过期时间:${e.expire}`,html:`<div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">\n    <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>\n    <div style="padding: 25px">\n      <div>您好，${e.user}童鞋，重置链接有效时间30分钟，请在${e.expire}之前重置您的密码：</div>\n      <a href="https://baidu.com" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>\n      <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>\n    </div>\n    <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>\n</div>`})).messageId},O=o(5),D=o.n(O),Y=o(14),C=o.n(Y);const L=async(e,t)=>{const o=await(e=>f(e))(e);return null!=o&&o.toLowerCase()===t.toLowerCase()},P=new(0,v.Schema)({username:{type:String},password:{type:String},name:{type:String},created:{type:Date},updated:{type:Date},favs:{type:Number},gender:{type:String},roles:{type:String},pic:{type:String},mobile:{type:String},status:{type:String},location:{type:String},isVip:{type:String},count:{type:Number}});var R=v.model("users",P);var N=new class{async forget(e){const{body:t}=e.request;try{const o=await T({code:"1234",expire:w()().add(30,"minutes").format("YYYY-MM-DD HH:mm:ss"),email:t.username,user:"jasper"});e.body={code:200,data:o,msg:"邮件发送成功"}}catch(e){console.log(e)}}async login(e){const{body:t}=e.request,o=t.sid,n=t.code,r=await L(o,n);if(o&&r){console.log("check pass");let o="";const n=await R.findOne({username:t.username});if(await D.a.compare(t.password,n.password)&&(o=!0),o){const t=C.a.sign({_id:"jasper"},h.a.JWT_SECRET,{expiresIn:"1h"});e.body={code:200,token:t}}else e.body={code:404,msg:"用户名密码错误"}}else e.body={code:401,msg:"图片验证码不正确"}}async reg(e){const{body:t}=e.request,o=t.sid,n=t.code,r={};let s=!0;if(await L(o,n)){const o=await R.findOne({username:t.username});null!==o&&void 0!==o.username&&(r.username=["该邮箱已经注册，可以通过邮箱找回密码"],s=!1);const n=await R.findOne({name:t.name});if(null!==n&&void 0!==n.name&&(r.username=["此昵称已被注册"],s=!1),s){t.password=await D.a.hash(t.password,5);const o=new R({username:t.username,name:t.name,password:t.password,created:w()().format("YYYY-MM-DD HH:mm:ss")}),n=await o.save();return void(e.body={code:200,data:n,msg:"success"})}}else r.code=["验证码已经失效，重新获取"];e.body={code:500,msg:r}}};const H=new a.a;H.prefix("/login"),H.post("/forget",N.forget),H.post("/login",N.login),H.post("/reg",N.reg);var U=H;t.a=r()(E,U)},function(e,t,o){"use strict";o.r(t),function(e){var t=o(6),n=o.n(t),r=o(7),s=o.n(r),a=o(8),i=o.n(a),c=o(9),u=o.n(c),d=o(10),p=o.n(d),l=o(21),g=o(15),f=o.n(g),m=o(16),y=o.n(m),b=o(17),h=o.n(b),v=o(18),x=o.n(v),w=o(19),q=o.n(w),S=o(0),k=o(20);const j=new n.a,E=s()({secret:S.a.JWT_SECRET}).unless({path:[/^\/public/,/^\/login/]}),_=x()([f()(),p()(i.a.join(e,"../public")),h()(),y()({pretty:!1,param:"pretty"}),u()(),k.a,E]);j.use(q()()),j.use(_),j.use(Object(l.a)()),j.listen(3e3)}.call(this,"src")},function(e,t){e.exports=require("util")}]);