module.exports = (sequelize, DataTypes) => {
    const FavMovieGenre = sequelize.define('FavMovieGenre', {
      movieGenres: {
        type: DataTypes.STRING,
        allowNull: false
      } 
    });
  
    FavMovieGenre.associate = function(models) {
        FavMovieGenre.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return FavMovieGenre;
};