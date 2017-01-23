<?php

use Illuminate\Database\Seeder;

class doorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $openTime = '10:00';
        $closeTime = '22:00';
        $doors = ['86 Makerspace','86 Woodshop','86 Stairwell','86 Artspace','13 Emporium','13 Coworking'];
        foreach ($doors as $door) {
            \App\Door::create(['name' => $door,
                'sundayOpen' => $openTime,
                'sundayClose' => $closeTime,
                'mondayOpen' => $openTime,
                'mondayClose' => $closeTime,
                'tuesdayOpen' => $openTime,
                'tuesdayClose' => $closeTime,
                'wednesdayOpen' => $openTime,
                'wednesdayClose' => $closeTime,
                'thursdayOpen' => $openTime,
                'thursdayClose' => $closeTime,
                'fridayOpen' => $openTime,
                'fridayClose' => $closeTime,
                'saturdayOpen' => $openTime,
                'saturdayClose' => $closeTime,
                'unlocked' => false
            ]);
        }
    }
}
