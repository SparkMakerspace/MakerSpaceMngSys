<?php

namespace App\Policies;

use App\User;
use App\Event;
use Illuminate\Auth\Access\HandlesAuthorization;

class EventPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the Event.
     *
     * @param  \App\User  $user
     * @param  \App\Event  $event
     * @return mixed
     */
    public function view(User $user, Event $event)
    {
        return true;
    }

    /**
     * Determine whether the user can view EventTemplates.
     *
     * @param  \App\User  $user
     * @param  \App\Event  $event
     * @return mixed
     */
    public function viewTemplates(User $user)
    {
        if ($user->active == '1' && $user->accountType == 'member'){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can create Events.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if ($user->active == '1' && $user->accountType == 'member'){
           return true;
        }
        return false;
    }

    /**
     * Determine whether the user can update the Event.
     *
     * @param  \App\User  $user
     * @param  \App\Event  $event
     * @return mixed
     */
    public function update(User $user, Event $event)
    {
        //
    }

    /**
     * Determine whether the user can delete the Event.
     *
     * @param  \App\User  $user
     * @param  \App\Event  $event
     * @return mixed
     */
    public function delete(User $user, Event $event)
    {
        //
    }
}
