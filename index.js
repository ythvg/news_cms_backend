// 加载express
const express = require('express');        // call express
const app = express();                 // 获得express定义的app，app对象此时代表整个web应用
const bodyParser = require('body-parser');
const router = require('./routes/news');

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8081;        // set our port

// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', router);

// 启动server
// =============================================================================
//开始监听端口
app.listen(port);
console.log('Magic happens on port ' + port);

const url = "mongodb://localhost/news" // 连接mongodb的url
const mongoose = require('mongoose');//加载mongoose模块
mongoose.connect(url); // 连接数据库
