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
        Permission::create(['name'=>'administrate']);
        Permission::create(['name'=>'create users']);
        Permission::create(['name'=>'read users']);
        Permission::create(['name'=>'update users']);
        Permission::create(['name'=>'delete users']);
        Permission::create(['name'=>'create posts']);
        Permission::create(['name'=>'read posts']);
        Permission::create(['name'=>'update posts']);
        Permission::create(['name'=>'delete posts']);
        Permission::create(['name'=>'create groups']);
        Permission::create(['name'=>'read groups']);
        Permission::create(['name'=>'update groups']);
        Permission::create(['name'=>'delete groups']);
    }
}
