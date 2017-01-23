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
        $john = ['email'=>'john@scimone.net',
            'name'=>'John Scimone',
            'password'=>'secret',
            'address1'=>'1 Some Rd',
            'address2'=>'',
            'city'=>'Waterford',
            'state'=>'CT',
            'zipcode'=>'06385',
            'phone'=>'(203) 123-4567'
        ];
        
        $mike = ['email'=>'mike@mmisuncool.com',
            'name'=>'Mike Molinari',
            'password'=>'secret',
            'address1'=>'2 Another Rd',
            'address2'=>'',
            'city'=>'New London',
            'state'=>'CT',
            'zipcode'=>'06325',
            'phone'=>'(860) 123-0000'
        ];
        
        $users = [$john,$mike];
        
        foreach ($users as $u) {
            $user = new \App\User;
            $user->email = $u['email'];
            $user->name = $u['name'];
            $user->password = Hash::make($u['password']);
            $user->address1 = $u['address1'];
            $user->address2 = $u['address2'];
            $user->city = $u['city'];
            $user->state = $u['state'];
            $user->zipcode = $u['zipcode'];
            $user->phone = $u['phone'];
            $user->save();
        }
    }
}
