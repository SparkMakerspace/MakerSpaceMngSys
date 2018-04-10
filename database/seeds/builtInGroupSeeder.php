<?php

use Illuminate\Database\Seeder;

class builtInGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // for upgradeability
        $old = App\Group::getAdminGroup();
        if (!is_null($old))
        {
            $old->delete();
        }
        
        App\Group::create([
            'name'=>'Administrators',
            'stub'=>'Admin',
            'about'=>'Administrators Group',
            'image_id'=>2,
        ]);
        
        App\Group::create([
            'name'=>'CalendarAdministrators',
            'stub'=>'CalAdmin',
            'about'=>'Calendar Admin Group',
            'image_id'=>2,
        ]);
    }
}
