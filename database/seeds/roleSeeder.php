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
        Role::create(['name'=>'working member']);
        Role::create(['name'=>'nonmember']);
        Role::create(['name'=>'lead']);
        Role::create(['name'=>'admin']);
        Role::create(['name'=>'superadmin'])->syncPermissions([
            'administrate',
            'create users',
            'read users',
            'update users',
            'delete users',
            'create events',
            'read events',
            'update events',
            'delete events',
            'create posts',
            'read posts',
            'update posts',
            'delete posts',
            'administrate posts',
            'create images',
            'read images',
            'update images',
            'delete images',
            'administrate images',
            'create resources',
            'read resources',
            'update resources',
            'delete resources',
            'create comments',
            'read comments',
            'update comments',
            'delete comments',
            'administrate comments',
            'create groups',
            'read groups',
            'update groups',
            'delete groups',
        ]);
    }
}
