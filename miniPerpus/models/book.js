'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Profile, { 'foreignKey': 'profileId'})
    }
    // static getBookbyLevel(filter){
      // return Book.findAll({
      //   where: !filter || filter == 'All' ? {} : {[Op.iLike]: `%${filter}%`},
      //   include: 'Profile'
      // })
    // }
    static getBookbyLevel(filter){
      return {[Op.iLike]: `%${filter}%`}
    }
  }
  Book.init({
    title: DataTypes.STRING,
    level: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.TEXT,
    publishYear: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  Book.beforeCreate((data) => {
    let date = data.publishYear
    if(data.level === 'Basic'){
      data.code = `B-${date}`
    }
    if(data.level === 'Intermediate'){
      data.code = `I-${date}`
    }
    if(data.level === 'Advance'){
      data.code = `A-${date}`
    }
  })
  return Book;
};