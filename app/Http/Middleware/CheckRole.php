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
        if (is_null($request->user()))
        {
            return abort(401,'Sorry, you\'re not authorized to access this page.');
        }
        if (! ($request->user()->hasRole($role)) & $request->user() != \Auth::user())
        {
            return abort(401,'Sorry, you\'re not authorized to access this page.');
        }

        return $next($request);
    }
}
