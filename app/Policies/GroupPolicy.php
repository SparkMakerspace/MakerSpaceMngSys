<?php

namespace App\Policies;

use App\Models\Group;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the group.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Group  $group
     * @return mixed
     */
    public function view(User $user, Group $group)
    {
        return true;
    }

    /**
     * Determine whether the user can create groups.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return \Auth::user()->role == 'admin';
    }

    /**
     * Determine whether the user can update the group.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Group  $group
     * @return mixed
     */
    public function update(User $user, Group $group)
    {
        return \Auth::user()->role == 'admin';
        //TODO Add leads here.
    }

    /**
     * Determine whether the user can delete the group.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Group  $group
     * @return mixed
     */
    public function delete(User $user, Group $group)
    {
        return \Auth::user()->role == 'admin';
    }

    public function alter(User $user, Group $group)
    {
        return \Auth::user()->role == 'admin';
    }
}
