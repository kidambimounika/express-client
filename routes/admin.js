var express = require('express');
var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
const request = require('request');




router.get('/',function(req,res,next){
    res.render('admin/dashboard',{
        layout:'layout-admin',
        title:'admin Dashbord',
        navDashboard:true

    });
});

router.get('/projects',function(req,res,next){

    // client.get('http://localhost:3030/projects', args,function(response,error){
    //     console.log("res"+response);
    //     console.log("error"+error);
    //     res.render('admin/projects',{layout:"layout-admin",title:"projects",showfooter:true,navProjects:true,projects:response.data});
    // });
    request('http://localhost:3030/projects',function(err,response,body){
        console.log(JSON.parse(body).data)
        res.render('admin/projects', { 
                 title: 'Projects', 
                 layout:'layout-admin',
                 navProjects: true, 
                 showFooter: true, 
                 projects: JSON.parse(body).data
             });
    })
});
router.get('/projects/create',function(req,res,next){
    res.render('admin/project-create',{
        layout:'layout-admin',
        title:'projects Admin',
        navProjects:true

    });
});
router.get('/projects/:projectAlias',function(req,res,next){
    // client.get("http://localhost:3030/projects/"+req.params.projectAlias,function(jsonData,response){
    //     res.render('admin/project-detail',{
    //         layout:"layout-admin",
    //         title:jsonData.data.name,
    //         navProjects:true,
    //         showFooter:true,
    //         project:jsonData.data
    //     });
    // });
    request('http://localhost:3030/projects/'+req.params.projectAlias,function(err,response,body){
        console.log('-----------'+JSON.parse(body));
        res.render('admin/project-detail', { 
                 title: 'Projects', 
                 layout:'layout-admin',
                 navProjects: true, 
                 showFooter: true, 
                 project: JSON.parse(body).data
             });
    })
});


router.post('/projects/create',function(req,res,next){
    var callback = function(error,data){
        console.log(error);
        console.log(data);
        res.redirect('/admin/projects');

    };
    var inputdata=req.body;
    projectService.crete(inputData,callback);
});
router.post('/project/:projectAlias/update',function(req,res,next){
    var pAlias = req.params.projectsAlias;
    var args = {
        data:{
            name:req.body.name,
            alias:req.body.alias,
            description:req.body.description,
            githuburl:req.body.githuburl,
            tags:req.body.tags
        },
        headers:{"content-type":"application/json"}
    };
    console.log("update",args.data);
    client.post('http://localhost:3030/projects/:'+pAlias+'/update',args,function(jsonData,response){
    console.log("update------------------>"+jsonData.data);
    if(jsonData.code ===200)
res.redirect('/admin/projects');

});
});

router.get('/media',function(req,res){
    res.render('/admin/upload',{
        layout:'layout-admin',
        title:'Image Upload',
        navMeadia:true

    });
});

router.get('/blog',function(req,res,next){
    // client.get('http://localhost:3030/blogs',function(response,error){
    //     res.render('admin/blog',{layout:"layout-admin",
    //     title:"blog",
    //     showFooter:true,
    //     navBlogs:true,
    //     blogs:response.data
    // });
    // });
    request('http://localhost:3030/blogs',function(err,response,body){
        
        res.render('admin/blog', { 
                 title: 'blog', 
                 layout:'layout-admin',
                 navBlog: true, 
                 showFooter: true, 
                 blogs: JSON.parse(body).data
             });
    })
});


router.get('/blog/:blogAlias',function(req,res,next){
    client.get("http://localhost:3030/blogs/"+req.params.blogAlias,function(jsonData,response){
res.render('admin/blog-detail',{
    layout:"layout-admin",
    title:jsondata.data.name,
    navBlogs:true,
    showFooter:true,
    blogs:jsonData.data
});
    });
});
module.exports=router;

