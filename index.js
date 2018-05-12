// 加载express
var express = require('express');        // call express
var app = express();                 // 获得express定义的app，app对象此时代表整个web应用
bodyParser = require('body-parser');

const News = require('./models/news');

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// API路由配置
// =============================================================================
var router = express.Router();              // 获得express router对象

router.use(function(req, res, next) {
    // 打印
    console.log('Something is happening.');
    next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});

// 用get动词访问 http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', router);

router.route('/news')
    // 创建一条bear (用 POST动词访问uri http://localhost:8080/api/news)
    .post(function(req, res) {
        
        var news = new News();      // 创建一个News model的实例
        news.title = req.body.title;  // 从request取出title参数的值然后设置news的title字段
        news.content = req.body.content;

        // 保存news，加入错误处理，即把错误作为响应返回
        news.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'News created!' });
        });
        
    })
    .get(function(req, res) {
        News.find(function(err, news) {
            if (err)
                res.send(err);

            res.json(news);
        });
    });   
    
router.route('/news/:news_id')
    .get(function(req, res) {
        News.findById(req.params.news_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function(req, res) {

        News.findById(req.params.news_id, function(err, news) {

            if (err)
                res.send(err);

            news.title = req.body.title;
            news.content = req.body.content;
            // 保存bear
            news.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'News updated!' });
            });

        });
    })
    .delete(function(req, res) {
        News.remove({
            _id: req.params.news_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });   


// 启动server
// =============================================================================
//开始监听端口
app.listen(port);
console.log('Magic happens on port ' + port);

var url = "mongodb://localhost/news" // 连接mongodb的url
var mongoose = require('mongoose');//加载mongoose模块
mongoose.connect(url); // 连接数据库
