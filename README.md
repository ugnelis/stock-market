# stock-market

![AngularJS](https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/header/angular.png) 
![plus icon](https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/header/plus.png)
![Bootstrap 3](https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/header/bootstrap.png)
![plus icon](https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/header/plus.png)
![Laravel 5](https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/header/laravel.png)

## About

Stock Market uses AngularJS, Bootstrap and Laravel 5.

Stock Market is a project for 'Computer Networks and Internet Technologies' module of Kaunas University of Technology.

## Screenshots
<img src="https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/screenshots/home-user.png" alt="Home" width="200">
<img src="https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/screenshots/stock.png" alt="Stock" width="200">
<img src="https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/screenshots/profile-user.png" alt="Profile" width="200">
<img src="https://raw.githubusercontent.com/Ugnelis/stock-market/master/readme/screenshots/admin_dashboard.png" alt="Admin Dashboard" width="200">

## Usage

### Installation

After you have cloned this repository, run this command in _stock-market/laravel_ folder:
```bash
$ composer install
```
Then _stock-market/angular_ folder run this:
```bash
$ npm install
$ bower install
$ npm install http-server -g # this is optional
```

### Database Configuration

In _stock-market/laravel_ folder rename _.env.example_ to _.env_ and put your database details in it.

Then run command:
```bash
$ php artisan migrate
$ php artisan db:seed
```

### Make It Work
In _stock-market/angular_ run these commands:
```bash
$ grunt init
$ grunt
```
In other terminal window:
```bash
$ cd dist/
$ http-server # this is optional
```
In _stock-market/larave_ run this command:
```bash
php artisan serve
```
