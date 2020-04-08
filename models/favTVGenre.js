module.exports = (sequelize, DataTypes) => {
  const FavTVGenre = sequelize.define("FavTVGenre", {
    tVGenres: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  FavTVGenre.associate = function(models) {
    FavTVGenre.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return FavTVGenre;
};
