<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = new User;
        $init->officer_name = "Administrator";
        $init->username = "Administrator";
        $init->email = "admin@gmail.com";
        $init->phone_number = "088228740010";
        $init->photo = "12";
        $init->password = Hash::make("123456");
        $init->level_id = '1';
        $init->save();

        $init = new User;
        $init->officer_name = "officer";
        $init->username = "Officer";
        $init->email = "officer@gmail.com";
        $init->phone_number = "088228740010";
        $init->photo = "21";
        $init->password = Hash::make("123456");
        $init->level_id = '2';
        $init->save();
    }
}
