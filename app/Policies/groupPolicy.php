<?php

namespace App\Policies;

use App\Group;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

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
        Log::debug('group create policy check');
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
    * Determine whether the acting user can delete a group
    * 
    * @param  User   $user
    * @param  Group  $group
    * @return bool
    */
    public function join(User $user, $stub)
    {
        $group = Group::whereStub($stub)->first();
        if ($group === Group::getAdminGroup() || $group === Group::getCalAdminGroup())
        {
            return false;
        }
        return true;
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
        Log::debug('before called!');
        if (Group::getAdminGroup()->isUser($user))
        {
            return true;
        }
    }
}
