<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function before(User $user, $ability)
    {
        if ($user->getAttribute('role') == 'admin') {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can view the user.
     *
     * @param  \App\Models\User $currUser
     * @param  \App\Models\User $User
     * @return mixed
     */
    public function view(User $currUser, User $user)
    {
        return $currUser == $user;
    }

    public function index(User $currUser)
    {
        return false;
    }

    /**
     * Determine whether the user can create users.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $currUser)
    {
        return false;
    }

    /**
     * Determine whether the user can update the user.
     *
     * @param  \App\Models\User  $currUser
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function update(User $currUser, User $user)
    {
        return $currUser == $user;
    }

    /**
     * Determine whether the user can delete the user.
     *
     * @param  \App\Models\User  $currUser
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function delete(User $currUser, User $user)
    {
        return false;
    }
}
