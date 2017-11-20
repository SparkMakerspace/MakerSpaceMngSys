<?php

use Illuminate\Database\Seeder;

class contractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Contract::create(['text'=>'This is contract text. WOOOO!!!<br><br>So yeah.','revision'=>'0.5']);
    }
}
