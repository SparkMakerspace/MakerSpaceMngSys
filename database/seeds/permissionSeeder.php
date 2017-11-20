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
    }
}
