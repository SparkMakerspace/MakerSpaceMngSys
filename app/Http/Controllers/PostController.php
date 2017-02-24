<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class PostController.
 *
 * @author  The scaffold-interface created at 2017-01-18 02:52:09am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - post';
        $posts = Post::paginate(6);
        return view('post.index',compact('posts','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - post';
        
        return view('post.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = new Post();

        
        $post->posted_at = $request->posted_at;

        
        $post->title = $request->title;

        
        $post->body = $request->body;

        
        $post->image = $request->image;

        
        
        $post->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new post has been created !!']);

        return redirect('post');
    }

    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id,Request $request)
    {
        $title = 'Show - post';

        if($request->ajax())
        {
            return URL::to('post/'.$id);
        }

        $post = Post::findOrfail($id);
        return view('post.show',compact('title','post'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - post';
        if($request->ajax())
        {
            return URL::to('post/'. $id . '/edit');
        }

        
        $post = Post::findOrfail($id);
        return view('post.edit',compact('title','post'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function update($id,Request $request)
    {
        $post = Post::findOrfail($id);
    	
        $post->posted_at = $request->posted_at;
        
        $post->title = $request->title;
        
        $post->body = $request->body;
        
        $post->image = $request->image;
        
        
        $post->save();

        return redirect('post');
    }

    /**
     * Delete confirmation message by Ajaxis.
     *
     * @link      https://github.com/amranidev/ajaxis
     * @param    \Illuminate\Http\Request  $request
     * @return  String
     */
    public function DeleteMsg($id,Request $request)
    {
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/post/'. $id . '/delete');

        if($request->ajax())
        {
            return $msg;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function destroy($id)
    {
     	$post = Post::findOrfail($id);
     	$post->delete();
        return URL::to('post');
    }
}
