const db = require('../index');
const Sequelize = require('sequelize');

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    streetAddress: {
        type: Sequelize.STRING,
    },
    suite: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    zip: {
        type: Sequelize.INTEGER,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isAuthenticated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}, {
    hooks: {
        beforeCreate: user => {
            user.password = hash(user.password);
        }
    }
});



User.login = async function (username, password) {
    return await this.findOne({
      where: {
        username, 
        password: hash(password)
      }
    })
}
  
  

User.remove = async function (id) {
    const user = await this.findByPk(id);
    await user.destroy();
  };


module.exports = User;