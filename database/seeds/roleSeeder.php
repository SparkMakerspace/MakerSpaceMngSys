<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name'=>'member']);
        Role::create(['name'=>'nonmember']);
        Role::create(['name'=>'superadmin'])->syncPermissions(\Spatie\Permission\Models\Permission::all());
    }
}
