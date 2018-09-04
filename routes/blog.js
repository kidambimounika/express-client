var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var request = require('request');


router.get('/', function (req, res, next) {
    console.log('Came here')
    request('http://localhost:3030/blogs',function(err,response,body){
        console.log(JSON.parse(body).data)
        res.render('blog', { 
                 title: 'blog', 
                 navBlog: true, 
                 showFooter: true,
                 blog: JSON.parse(body).data
             });
    })
    // client.get("http://localhost:3030/projects", function (jsonData, response) {
    //     // parsed response body as js object
    //     console.log('got res')
    //     console.log('==>>>' +jsonData);
    
    //     // raw response
    //     console.log('++'+response);
    //     // res.render('projects', { 
    //     //     title: 'Projects', 
    //     //     navProjects: true, 
    //     //     showFooter: true, 
    //     //     projects: jsonData.data
    //     // });
    // });
});
  
router.get('/:blogAlias', function (req, res, next) {
    request.get("http://localhost:3030/blogs/",+req.params.blogAlias,function(err,response,body){
        console.log(JSON.parse(body).data)
    
         //function (jsonData, response) {
            // parsed response body as js object
            // console.log(jsonData);
            // raw response
             //console.log(response);

             res.render('blog-detail', { 
                title: JSON.parse(body).data.data.name,
                navBlog: true, 
                showFooter: true, 
                blog: JSON.parse(body).data
            });
        });
});
  
router.get('/:blogAlias/demo', function (req, res, next) {
    function renderDemo(error, blog){  
        console.log(blog);
        res.render('demo', { 
            layout: 'layout-demo',
            title: blog.name,
            blogs: blog
        });
    };
    blogService.getbloglogByAlias(req.params.blogAlias, renderDemo);
});
module.exports = router;