<?php

namespace App\Http\Controllers;

use App\Image;
use Carbon\Carbon;
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
        $posts = Post::orderBy('created_at', 'dec')->paginate(6);
        return view('post.index',compact('posts','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->edit();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {




        if($request->input('posted_at') == null )
        {
            //dd($request);
            $request->merge(['posted_at' => date($format = 'Y-m-d H:i:s')]);
            //$request->posted_at = date($format = 'Y-m-d H:i:s');
            //dd($request->posted_at);
        }

        $post = Post::create($request->except('group'));

        $post->groups()->sync($request->group);

        $post->setOwner(\Auth::user());



        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
            'test-event',
            ['message' => 'A new post has been created !!']);

        return redirect('post/'.$post->id);
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

    public function edit($id = null, Request $request = null)
    {
        dd($request);
        if(!is_null($id)) {
            $title = 'Edit Post';
            $submit = 'Update';
            $post = Post::firstOrNew(['id'=>$id]);
            if($request->ajax())
            {
                return URL::to('post/'. $id . '/edit');
            }
            return view('post.edit', compact('title','post','submit'));
        }
        else {
            $title = 'Create Post';
            $submit = 'Create';
            return view('post.edit', compact('title','submit'));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function update($id, $request)
    {
        dd($request);
        $post = Post::findOrfail($id);

        $post->update($request->except('group'));

        $post->groups()->sync($request->group);

        $post->setOwner(\Auth::user());




        return redirect('post/'.$post->id);
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
