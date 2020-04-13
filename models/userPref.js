module.exports = (sequelize, DataTypes) => {
  const UserPref = sequelize.define(
    "UserPref",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatarImg: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.STRING
      },
      enjoyMovieTV: {
        type: DataTypes.BOOLEAN,
      },
      enjoyMusic: {
        type: DataTypes.BOOLEAN,
      },
      enjoyGame: {
        type: DataTypes.BOOLEAN,
      },
      platform: {
        type: DataTypes.STRING
      },
      play1: {
        type: DataTypes.STRING
      },
      play2: {
        type: DataTypes.STRING
      },
      play3: {
        type: DataTypes.STRING
      },
      watch1: {
        type: DataTypes.STRING
      },
      watch2: {
        type: DataTypes.STRING
      },
      watch3: {
        type: DataTypes.STRING
      },
      listen1: {
        type: DataTypes.STRING
      },
      listen2: {
        type: DataTypes.STRING
      },
      listen3: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );

  UserPref.associate = function(models) {
    UserPref.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return UserPref;
};
