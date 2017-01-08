<?php

namespace App\Repositories;

use App\Models\Group;
use InfyOm\Generator\Common\BaseRepository;

class GroupRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'image_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Group::class;
    }
}
