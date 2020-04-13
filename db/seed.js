require("dotenv").config();
const db = require("../models");

const users = [
  {
    email: "user1@test.com",
    password: "password"
  },
  {
    email: "user2@test.com",
    password: "password"
  },
  {
    email: "user3@test.com",
    password: "password"
  },
  {
    email: "user4@test.com",
    password: "password"
  },
  {
    email: "user5@test.com",
    password: "password"
  }
];

const userPrefs = [
  {
    userName: "User 1",
    avatarImg: "./assets/gamer.jpg",
    bio: "Hi Im User 1 and I love Quaranstream!",
    enjoyMovieTV: true,
    enjoyMusic: true,
    enjoyGame: true,
    platform: "Playstation 4",
    play1: "Arcade",
    play2: "Platformer",
    play3: "Shooter",
    watch1: "Comedy",
    watch2: "Horror",
    watch3: "Romance",
    listen1: "Electronic",
    listen2: "Rap",
    listen3: "Country",
    UserId: 1
  },
  {
    userName: "User 2",
    avatarImg: "./assets/gamergirl.jpg",
    bio: "Hi Im User 2 and I love Quaranstream!",
    enjoyMovieTV: true,
    enjoyMusic: true,
    enjoyGame: true,
    platform: "Playstation 4",
    play1: "Arcade",
    play2: "Platformer",
    play3: "Shooter",
    watch1: "Comedy",
    watch2: "Horror",
    watch3: "Romance",
    listen1: "Electronic",
    listen2: "Rap",
    listen3: "Country",
    UserId: 2
  },
  {
    userName: "User 3",
    avatarImg: "./assets/musicstaff.jpg",
    bio: "Hi Im User 3 and I love Quaranstream!",
    enjoyMovieTV: true,
    enjoyMusic: true,
    enjoyGame: true,
    platform: "Playstation 4",
    play1: "Arcade",
    play2: "Platformer",
    play3: "Shooter",
    watch1: "Comedy",
    watch2: "Horror",
    watch3: "Romance",
    listen1: "Electronic",
    listen2: "Rap",
    listen3: "Country",
    UserId: 3
  },
  {
    userName: "User 4",
    avatarImg: "./assets/popcorn.jpg",
    bio: "Hi Im User 4 and I love Quaranstream!",
    enjoyMovieTV: true,
    enjoyMusic: true,
    enjoyGame: true,
    platform: "Playstation 4",
    play1: "Arcade",
    play2: "Platformer",
    play3: "Shooter",
    watch1: "Comedy",
    watch2: "Horror",
    watch3: "Romance",
    listen1: "Electronic",
    listen2: "Rap",
    listen3: "Country",
    UserId: 4
  },
  {
    userName: "User 5",
    avatarImg: "./assets/virus.jpg",
    bio: "Hi Im User 5 and I love Quaranstream!",
    enjoyMovieTV: true,
    enjoyMusic: true,
    enjoyGame: true,
    platform: "Playstation 4",
    play1: "Arcade",
    play2: "Platformer",
    play3: "Shooter",
    watch1: "Comedy",
    watch2: "Horror",
    watch3: "Romance",
    listen1: "Electronic",
    listen2: "Rap",
    listen3: "Country",
    UserId: 5
  }
];

db.User.bulkCreate(users)
  .then(() => {
    return db.UserPref.bulkCreate(userPrefs);
  })
  .then(() => {
    console.log("All Done!");
  });
