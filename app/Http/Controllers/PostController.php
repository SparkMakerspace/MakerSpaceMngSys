<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


/**
 * Class PostController
 * @package App\Http\Controllers
 */
class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $posts = Post::paginate(20);
        return view('posts.index',compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $post = new Post;
        return view('posts.create',['post'=>$post]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        if ($request->get('submit') != 'Cancel') {
            $post = new Post;
            $this->validate($request,Post::getValidationRules());
            $post->title = $request->title;
            $post->body = nl2br(e($request->body));
            $post->user_id = Auth::id();
            $post->topic_id = 0;
            $post->post_time = time();
            $post->save();
        }
        return redirect('/posts');
    }

    /**
     * Display the specified resource.
     *
     * @param Post $post
     * @return Response
     */
    public function show(Post $post)
    {
        return view('posts.show', ['post'=>$post]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Post $post
     * @return Response
     */
    public function edit(Post $post)
    {
        $this->authorize('update',$post);
        // Replace html line-breaks with newlines
        $breaks = array("<br />","<br>","<br/>");
        $post->body = str_ireplace($breaks, "", $post->body);

        return view('posts.edit',['post'=>$post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Post $post
     * @return Response
     */
    public function update(Request $request, Post $post)
    {
        $this->authorize('update',$post);
        $this->validate($request, Post::getValidationRules());
        $post->title = $request->title;
        $post->body = nl2br(e($request->body));
        $post->topic_id = 0;
        $post->save();
        return redirect('/posts');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Post $post
     * @return Response
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete',$post);
        $post->delete();
        return redirect(route('posts.index'))   ;
    }
}
