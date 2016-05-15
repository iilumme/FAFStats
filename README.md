# FAFStats

[FAFStats in Heroku](http://fafstats.herokuapp.com)

[![Build Status](https://travis-ci.org/iilumme/FAFStats.png)](https://travis-ci.org/iilumme/FAFStats)
[![Coverage Status](https://coveralls.io/repos/github/iilumme/FAFStats/badge.svg)](https://coveralls.io/github/iilumme/FAFStats)
[![Code Climate](https://codeclimate.com/github/iilumme/FAFStats/badges/gpa.svg)](https://codeclimate.com/github/iilumme/FAFStats)

FAFStats is originally [a group project](https://github.com/mluukkai/WebPalvelinohjelmointi2016/wiki/projekti) by [Pyry Mäkinen](https://github.com/Blodir) and [Iina Lumme](https://github.com/iilumme), but will continue beyond the scope of the course.

The goal of this project is to create a platform where [FAForever](http://faforever.com) players can find and discuss game replays. To achieve this we are heavily relying on the (incomplete) [FAF API](https://github.com/FAForever/api) as well as our own database.

## Issues
Login via FAF oAuth does not currently work, as a workaround you can log in as ANY user for testing purposes.

To test admin functionality use played id: 133636

Some concurrent requests to [FAF API](https://github.com/FAForever/api) fail occassionally. We would greatly appreciate it if someone would look into these issues.

## Installing the project
```
bundle install
bower install
npm install
rake db:migrate
rake db:seed
```

Run ``` rails s ``` to start the server

Run ``` grunt ``` (you will need grunt-cli) if you want to compile sass

## Structure of the project
The project relies on 3 main parts:
* The official [FAF API](https://github.com/FAForever/api) (which is not under our control)
  * This is where we get up to date information about games, players, maps etc.
* Stats API
  * Handles all FAFStats unique functionality (comments, star ratings, tags and such)
* Angular Front-End
  * The client side application
* (Discontinued) Resque Scheduler
  * Runs scheduled tasks such as updating rating evolution and faction distribution charts
  * Discontinued, because of increased server costs

## FAFStats Data Types
* player
  * Every player that has been registered to FAF
  * Uses the same player_id as FAF API
* user
  * Every user who has logged into FAFStats
  * Contains information related to the user
* comment
  * Users can create comments that are connected to games
* game
  * Games have comments and star_ratings as well as a "game rating" which is used to find most popular games
* rating
  * (was used by resque to create rating evolution charts)
* star_rating
  * 1-5 stars that users can give to games
* tag
  * Moderators (user.usertype < 2) can add tags to players (such as "developer" or "pro")
 * Uses "tagged" for many-to-many connection to player
