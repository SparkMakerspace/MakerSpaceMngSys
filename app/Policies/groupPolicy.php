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

   /**
    * Determine whether the acting user can create a group
    * 
    * @param  User   $user
    * @return bool
    */
    public function create(User $user)
    {
        return false;
    }

   /**
    * Determine whether the acting user can view a group
    * 
    * @param  User   $user
    * @return bool
    */
    public function view(User $user, Group $group)
    {
        return ($group->visibility == 'all');
    }    

   /**
    * Determine whether the acting user can update a group
    * 
    * @param  User   $user
    * @param  Group  $group
    * @return bool
    */
    public function update(User $user, Group $group)
    {
        return ($group->visibility == 'all');
    }    

   /**
    * Determine whether the acting user can delete a group
    * 
    * @param  User   $user
    * @param  Group  $group
    * @return bool
    */
    public function delete(User $user, Group $group)
    {
        return $group->isLead($user);
    }

   /**
    * This function is called before any ability herein and if it returns true,
    * the user is granted permission. This is useful for superadmin checking. 
    * 
    * @param  User   $user
    * @param  Group  $group
    * @return bool
    */
    public function before(User $user, $ability)
    {
        return Group::getAdminGroup()->isUser($user);
    }
}
