<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(imageSeeder::class);
        $this->call(contractSeeder::class);
        $this->call(permissionSeeder::class);
        $this->call(groupSeeder::class);
        $this->call(roleSeeder::class);
        $this->call(userSeeder::class);
        $this->call(doorSeeder::class);
        $this->call(postSeeder::class);
        $this->call(NavigationSeeder::class);

    }
}
