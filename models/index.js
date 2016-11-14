var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
}, {
	getterMethods: {
		route: function () {
			return '/wiki/' + this.urlTitle;
		}
	},

	hooks: {
    	beforeValidate: function (page) {
    		function generateUrlTitle (title) {
					if (title) {
						return title.replace(/\s+/g, '_').replace(/\W/g, '');
					} else {
						return Math.random().toString(36).substring(2, 7);
					}
				}
    		page.urlTitle = generateUrlTitle(page.title);
    		}
		}
	});


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};