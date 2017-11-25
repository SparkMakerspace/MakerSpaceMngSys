<?php

use Illuminate\Database\Seeder;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $builtIn = ['email'=>'builtin@mail.com',
            'name'=>'Built In Account',
            'username'=>'builtIn',
            'password'=>'secret',
            'address1'=>'',
            'address2'=>'',
            'city'=>'',
            'state'=>'',
            'zipcode'=>'',
            'phone'=>'(000) 000-0000',
            'over13'=>1,
            'over16'=>1
        ];

        $john = ['email'=>'john@scimone.net',
            'name'=>'John Scimone',
            'username'=>'jjfs85',
            'password'=>'secret',
            'address1'=>'1 Some Rd',
            'address2'=>'',
            'city'=>'Waterford',
            'state'=>'CT',
            'zipcode'=>'06385',
            'phone'=>'(203) 123-4567',
            'over13'=>1,
            'over16'=>1
        ];

        $drew = ['email'=>'hi@drew.ga',
            'name'=>'Drew Gates',
            'username'=>'drew',
            'password'=>'secret',
            'address1'=>'1 Main St',
            'address2'=>'',
            'city'=>'Anytown',
            'state'=>'CT',
            'zipcode'=>'06000',
            'phone'=>'(555) 867-5309',
            'over13'=>1,
            'over16'=>1
        ];
        
        $mike = ['email'=>'spark@smbisoft.com',
            'name'=>'Mike Molinari',
            'username'=>'mmiscool',
            'password'=>'secret',
            'address1'=>'2 Another Rd',
            'address2'=>'',
            'city'=>'New London',
            'state'=>'CT',
            'zipcode'=>'06325',
            'phone'=>'(860) 123-0000',
            'over13'=>1,
            'over16'=>1
        ];
        
        $users = [$builtIn,$john,$drew,$mike];
        
        foreach ($users as $u) {
            $user = new \App\User;
            $user->email = $u['email'];
            $user->name = $u['name'];
            $user->username = $u['username'];
            $user->password = Hash::make($u['password']);
            $user->address1 = $u['address1'];
            $user->address2 = $u['address2'];
            $user->city = $u['city'];
            $user->state = $u['state'];
            $user->zipcode = $u['zipcode'];
            $user->phone = $u['phone'];
            $user->over13 = $u['over13'];
            $user->over16 = $u['over16'];
            $user->save();
            $user->assignRole('superadmin');
        }
    }
}
