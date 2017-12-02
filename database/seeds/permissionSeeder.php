<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class permissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //First, obtain an array of all models
        $dir = app_path();
        $files = scandir($dir);

        $models = array();
        $namespace = '';
        foreach($files as $file) {
            //skip current and parent folder entries and non-php files
            if ($file == '.' || $file == '..' || !preg_match('/\.php/', $file)) continue;
            $models[] = strtolower($namespace . preg_replace('/\.php$/', '', $file));
        }

        //Generate permissions for each model
        foreach ($models as $model){
            Permission::create(['name'=>'create '.$model]);
            Permission::create(['name'=>'read '.$model]);
            Permission::create(['name'=>'update '.$model]);
            Permission::create(['name'=>'delete '.$model]);
        }

        //Other special permissions
        Permission::create(['name'=>'create event templates']);
        Permission::create(['name'=>'approve event templates']);
        Permission::create(['name'=>'read event templates']);
        Permission::create(['name'=>'update event templates']);
        Permission::create(['name'=>'delete event templates']);
    }
}
