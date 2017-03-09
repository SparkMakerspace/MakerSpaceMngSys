<?php

use Illuminate\Database\Seeder;

class groupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Group::create([
            'name'=>'Electronics',
            'stub'=>'electronics',
            'about'=>'This is the best group at Spark',
            'image_id'=>2,
            'contactInfo'=>'Leads: Mike Molinari and John Scimone
electronics@spark.coop'
        ]);
        \App\Group::create([
            'name'=>'3D Printing',
            'stub'=>'3d',
            'about'=>'This is the _second_ best group at Spark',
            'image_id'=>2,
            'contactInfo'=>'Lead: Tom
3h@spark.coop'
        ]);
        \App\Group::create([
            'name'=>'Kitchen',
            'stub'=>'kitchen',
            'about'=>'This is not the best group at Spark',
            'image_id'=>2,
            'contactInfo'=>'Lead: Maple
kitchen@spark.coop'
        ]);
    }
}
