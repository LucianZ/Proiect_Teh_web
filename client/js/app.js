var myApp = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngResource',
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        
        //typical routes... when someone navigates to a given directory, load the partial, and use the controller
        $routeProvider.when('http://proiect-teh-web-cloned-lucianz.c9users.io/Proiectv2.htmk?#contact', {controller: 'customerApiController'});

        
        //if no valid routes are found, redirect to /home
        $routeProvider.otherwise({redirectTo: '/home'});
        //new comment
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])
    .filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    });