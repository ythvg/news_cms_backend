const express = require('express');
const News = require('../models/news');

// API路由配置
// =============================================================================
const router = express.Router();              // 获得express router对象

router.use(function(req, res, next) {
    // 打印
    console.log('Something is happening.');
    next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});

// 用get动词访问 http://localhost:8081/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/news')
    // 创建一条news (用 POST动词访问uri http://localhost:8081/api/news)
    .post(function(req, res) {
        
        var news = new News();      // 创建一个News model的实例
        news.title = req.body.title;  // 从request取出title参数的值然后设置news的title字段
        news.content = req.body.content;
        news.ctime = req.body.ctime;

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

module.exports = router;