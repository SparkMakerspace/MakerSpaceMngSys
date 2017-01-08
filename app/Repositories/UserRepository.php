<?php

namespace App\Repositories;

use App\Models\User;
use InfyOm\Generator\Common\BaseRepository;

class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'username',
        'email',
        'phone',
        'streetAddress',
        'streetAddress2',
        'cityAddress',
        'stateAddress',
        'zipAddress',
        'contactPref',
        'keyCard',
        'role',
        'active',
        'password'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }
}
