const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.copy(
        'resources/assets/js/jquery.mask.min.js',
        'public/js'
    ).copy(
        'node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js',
        'public/js'
    ).copy(
        'node_modules/jquery-datetimepicker/build/jquery.datetimepicker.min.css',
        'public/css'
    );

    mix.styles('fullcalendar.css');

    mix.sass('app.scss')
       .webpack('app.js');
});
