module.exports = (sequelize, DataTypes) => {
  const UserPref = sequelize.define("UserPref", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatarImg: {
      type: DataTypes.STRING
    },
    enjoyMovie: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    enjoyMusic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    enjoyTV: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    enjoyGame: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  UserPref.associate = function(models) {
    UserPref.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserPref;
};
