/**
 * Created by IBM on 2016/5/10.
 */
var express = require("express");
var router = express.Router();
var Movie = require("../models/movie");

router.route('/').get(function(req,res){
    res.send("HEllo");
});

router.route('/movies')
//查询所有电影
.get(function (req, res) {
        Movie.find(function (err, movies) {
            if (err) {
                return res.send(err);
            }
            res.json(movies);
        });
    })
//新增一个电影
.post(function (req, res) {
            var movie = new Movie(req.body);
            movie.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                res.send({message: 'Movie Added'});
            });
        });


//更新路由
router.route('/movies/:id').put(function (req, res) {
//查询出要修改的movie
    Movie.findOne({_id: req.params.id}, function (err, movie) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            movie[prop] = req.body[prop];
        }
        //保存操作
        movie.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.json({message: 'Movie updated!'})
        })
    })
});


//查询单个电影
router.route('/movies/:id').get(function (req, res) {
    Movie.findOne({_id: req.params.id}, function (err, movie) {
        if (err) {
            return res.send(err);
        }

        res.json(movie);
    });
});

//删除电影
router.route('/movies/:id').delete(function (req, res) {
    Movie.remove({
        _id: req.params.id
    }, function (err, movie) {
        if (err) {
            return res.send(err);
        }

        res.json({message: 'Successfully deleted'});
    });
});

module.exports = router;