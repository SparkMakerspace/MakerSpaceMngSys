<?php

namespace App\Http\Controllers;


use App;
use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - comment';
        $comments = Comment::paginate(6);
        return view('comment.index',compact('comments','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - comment';

        return view('comment.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comment = new Comment();

        $comment->body = $request->body;

        $comment->user_id = \Auth::user()->id;

        $id = $request->id;
        $type = $request->type;

        $type::find($id)->comments()->save($comment);



        return redirect()->back();
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
        $title = 'Show - comment';

        if($request->ajax())
        {
            return URL::to('comment/'.$id);
        }

        $comment = Comment::findOrfail($id);
        return view('comment.show',compact('title','comment'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - comment';
        if($request->ajax())
        {
            return URL::to('comment/'. $id . '/edit');
        }


        $comment = Comment::findOrfail($id);
        return view('comment.edit',compact('title','comment'  ));
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
        $comment = Comment::findOrfail($id);

        $comment->body = $request->body;

        $comment->save();

        return redirect('comment');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/comment/'. $id . '/delete');

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
        $comment = Comment::findOrfail($id);
        $comment->delete();
        return URL::to('comment');
    }
}
