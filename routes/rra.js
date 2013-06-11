// our 'database'
var restaurants = {
    SKN:{name:'Shuriken', rating:10},
    ASK:{name:'Ashiko', rating:6},
    CGI:{name:'Chigiriki', rating:2},
    NGT:{name:'Naginata', rating:9},
    KTN:{name:'Katana', rating:10}
};

exports.home = function (req, res) {
	if (typeof req.session.username == 'undefined') res.render('home', { title:'restaurant rater app' });
	else res.redirect('/restaurants')
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
	username = req.body.username || 'Anonymous';
	req.session.username = username;
	res.redirect('/');
};

//handler for displaying each restauarant
exports.restaurants = function(req, res) {
	if(typeof req.session.username == 'undefined') res.redirect('/');
	else res.render('restaurants', {title: 'Restaurants', username: req.session.username, restaurants:restaurants});
};

//handler for displaying individual restaurants
exports.restaurant = function(req, res) {
	if(typeof req.session.username == 'undefined') res.redirect('/');
	else {
		var name = restaurants[req.params.id].name;
		var rating = restaurants[req.params.id].price;
		res.render('restaurant', {title: 'restaurant details - ' + name, username: req.session.username, name:name, rating:rating});
	}
};