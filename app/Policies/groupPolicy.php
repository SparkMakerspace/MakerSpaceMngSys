<?php

namespace App\Policies;

use App\User;
use App\Group;
use Illuminate\Auth\Access\HandlesAuthorization;

class groupPolicy
{
    use HandlesAuthorization;


    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Returns whether the acting user can administrate the active group
     *
     * @param User $user
     * @param Group $group
     * @return bool
     */
    public function administrate(User $user, Group $group)
    {
        return $group->isLead($user);
    }

    public function delete(User $user, Group $group)
    {
        return ($group->isLead($user) || Group::getAdmin);
    }
}
