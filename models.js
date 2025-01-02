const { Sequelize, DataTypes } = require('sequelize');

//Настройка Sequelize
const sequelize = new Sequelize('it-academy-project', 'root', '1234', {
   host: 'localhost',
   dialect: 'mysql'
});

//Модель пользователя
const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

//Модель  токена
const Token = sequelize.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Contents_blocks = sequelize.define('contents_blocks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    content_ord: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    block_type: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    block_attributes: {
        type: DataTypes.TEXT,
        allowNull: true
}, 
}, { timestamps: false }) 

const Cake = sequelize.define('cakes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    header: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Contents_blocks,
            key: 'content',
        }
    },
    metakeywords: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    metadescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_cake: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Cupcake = sequelize.define('cupcakes', {
   id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   url_code: {
       type: DataTypes.STRING,
       allowNull: false
   },
   header: {
       type: DataTypes.STRING,
       allowNull: false
   },
   content: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
           model: Contents_blocks,
           key: 'block_attributes',
       }
   },
   metakeywords: {
       type: DataTypes.TEXT,
       allowNull: false
   },
   metadescription: {
       type: DataTypes.TEXT,
       allowNull: false
   },
   image_cupcake: {
       type: DataTypes.STRING,
       allowNull: false
   }
}, {
   timestamps: false
})

Contents_blocks.hasMany(Cake, { foreignKey: 'content' });
Contents_blocks.hasMany(Cupcake, { foreignKey: 'content' });

module.exports = { User, Token, Contents_blocks, Cake, Cupcake };