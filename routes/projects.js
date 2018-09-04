var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var request = require('request');


router.get('/', function (req, res, next) {
    console.log('Came here')
    request('http://localhost:3030/projects',function(err,response,body){
        console.log(JSON.parse(body).data)
        res.render('projects', { 
                 title: 'Projects', 
                 navProjects: true, 
                 showFooter: true, 
                 projects: JSON.parse(body).data
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
  
router.get('/:projectAlias', function (req, res, next) {
    request.get("http://localhost:3030/projects/"+req.params.projectAlias,function(err,response,body){
        console.log(JSON.parse(body).data)
    
         //function (jsonData, response) {
            // parsed response body as js object
            // console.log(jsonData);
            // raw response
             //console.log(response);

            res.render('project-detail', { 
                title: JSON.parse(body).data.data.name,
                navProjects: true, 
                showFooter: true, 
                project: JSON.parse(body).data
            });
        });
});
  
router.get('/:projectAlias/demo', function (req, res, next) {
    function renderDemo(error, project){  
        console.log(project);
        res.render('demo', { 
            layout: 'layout-demo',
            title: project.name,
            project: project
        });
    };
    projectService.getProjectByAlias(req.params.projectAlias, renderDemo);
});

module.exports = router;