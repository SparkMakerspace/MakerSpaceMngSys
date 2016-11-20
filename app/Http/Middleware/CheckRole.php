<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (! ($request->user()->hasRole($role)))
        {
            return abort(401,'Sorry, you\'re not authorized to access this page.');
        }

        return $next($request);
    }
}
