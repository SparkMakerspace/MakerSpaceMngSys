<?php

use App\Door;
use App\User;
use App\Workstation;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

    public static $seededUsers = 5;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seededUsers = self::$seededUsers;
        $i = 1;
        while ($i <= $seededUsers)
        {
            $user = new User();
            $user->name = $i.$i.$i.$i.' User';
            $user->username = $i.$i.$i.$i.$i.$i;
            $user->email = $i.'@user.com';
            $user->password = bcrypt('password');
            $user->save();
            $i += 1;
        }
        $user = new User();
        $user->name = 'John Scimone';
        $user->username = 'johnsucks';
        $user->email = 'john@scimone.net';
        $user->role = 'admin';
        $user->password = bcrypt('password');
        $user->save();
        $user->workstations()->attach(Workstation::whereName('Electronics')
            ->first(),['permissionLevel'=>5]);
        $user->workstations()->attach(Workstation::whereName('3D Printing')
            ->first(),['permissionLevel'=>1]);
        $user->workstations()->attach(Workstation::whereName('Coworking')
            ->first(),['permissionLevel'=>1]);
        $user->workstations()->attach(Workstation::whereName('Spark Emporium')
            ->first(),['permissionLevel'=>1]);
        $user->doors()->attach(Door::whereName('86 Front')->first(),
            ['allHoursAccess'=>true]);
        $user->doors()->attach(Door::whereName('86 Stairwell')->first(),
            ['allHoursAccess'=>false]);
        $user = new User();
        $user->name = 'Mike Molinari';
        $user->username = 'mikesucks';
        $user->email = 'spam@smbisoft.com';
        $user->role = 'admin';
        $user->password = bcrypt('password');
        $user->save();
        $user->workstations()->attach(Workstation::where('name','=','Electronics')
            ->first(),['permissionLevel'=>5]);
        $user->workstations()->attach(Workstation::where('name','=','3D Printing')
            ->first(),['permissionLevel'=>1]);
        $user = new User();
        $user->name = 'Drew Gates';
        $user->username = 'drewsucks';
        $user->email = 'spark@drewgates.com';
        $user->role = 'admin';
        $user->password = bcrypt('password');
        $user->save();
        $user->workstations()->attach(Workstation::where('name','=','Electronics')
        ->first(),['permissionLevel'=>1]);
        $user->workstations()->attach(Workstation::where('name','=','3D Printing')
            ->first(),['permissionLevel'=>1]);
        $user->workstations()->attach(Workstation::where('name','=','Audio & Video')
            ->first(),['permissionLevel'=>5]);
        $user->workstations()->attach(Workstation::where('name','=','Programming')
            ->first(),['permissionLevel'=>5]);
    }
}
