<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Collective\Html\FormBuilder as Form;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Form::component('groups', 'partials.groupSelector', [ 'name' => 'group[]' , 'selectedGroups' => null ]);

        Form::component('imageselector', 'partials.ImageSelector', [ 'name' => 'name', 'value' => null, 'attributes' => [], 'buttonLabel' => 'Pick Image']);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() == 'local') {
            $this->app->register('Iber\Generator\ModelGeneratorProvider');
        }
    }
}
