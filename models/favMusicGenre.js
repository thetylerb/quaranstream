module.exports = (sequelize, DataTypes) => {
  const FavMusicGenre = sequelize.define("FavMusicGenre", {
    musicGenres: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  FavMusicGenre.associate = function(models) {
    FavMusicGenre.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return FavMusicGenre;
};
