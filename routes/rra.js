// our 'database'
var restaurants = {
    Harvester:{name:'Harvester', rating:5},
    Hawksmoor:{name:'Hawksmoor', rating:10},
    BurgerKing:{name:'Burger King', rating:2},
    Benihana:{name:'Benihana', rating:6},
    PizzaExpress:{name:'Pizza Express', rating:7}
};

exports.home = function (req, res) {
	if (typeof req.session.username == 'undefined') {
		res.render('home', { title:'Rrestaurant Rater App' });
	} else {
		res.redirect('/restaurants')
	}
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
	username = req.body.username || 'Noob';
	req.session.username = username;
	res.redirect('/');
};

//handler for displaying all restauarants
exports.restaurants = function(req, res) {
	if (typeof req.session.username == 'undefined') {
		res.redirect('/');
	} else {
		res.render('restaurants', {restaurants: restaurants});
	}
};

//handler for displaying individual restaurants
exports.restaurant = function(req, res) {
	var name = restaurants[req.params.id].name;
    var rating = restaurants[req.params.id].rating;
    res.render('restaurant', { name:name, rating:rating });
};


