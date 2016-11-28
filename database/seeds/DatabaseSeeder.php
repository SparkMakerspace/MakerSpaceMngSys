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
        $this->call(WorkstationSeeder::class);
        $this->call(DoorSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(PostSeeder::class);

    }
}
