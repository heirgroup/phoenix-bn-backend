const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersInfo.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    officeAddres: DataTypes.STRING,
    preferedLanguage: DataTypes.STRING,
    lineManager: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UsersInfo',
  });
  return UsersInfo;
};
