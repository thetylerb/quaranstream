module.exports = (sequelize, DataTypes) => {
  const FavGameGenre = sequelize.define("FavGameGenre", {
    gameGenres: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  FavGameGenre.associate = function(models) {
    FavGameGenre.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return FavGameGenre;
};
