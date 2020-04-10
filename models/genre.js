module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("Genre", {
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
  });

  Genre.associate = function(models) {
    Genre.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Genre;
};
