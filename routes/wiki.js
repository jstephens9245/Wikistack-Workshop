const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

// => /wiki
router.get('/',function(req,res){
	res.redirect('/'); // remove this and list out all the pages

})

router.post('/',function(req,res){
	// console.log('post', req.body);

	var page = Page.build({
		title: req.body.title,
		email: req.body.email,
		content: req.body.content,
	});
	page.save().then(function(_page) {
		console.log(_page.dataValues);
		res.redirect(_page.route);
	})

})

router.get('/add',function(req,res){
	res.render('addpage');
})

router.get('/:urlTitle',function(req,res){
	let url = req.params.urlTitle;
	Page.findOne({ where: {urlTitle: url} }).then(function(_page) {
		console.log("-------------", _page.dataValues)
		res.render('wikipage', {page: _page});
	});
})

module.exports = router;