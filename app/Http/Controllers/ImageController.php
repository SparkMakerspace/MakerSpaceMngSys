<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Response;
use Storage;

class ImageController extends Controller
{

    /**
     * Display a listing of the Image.
     *
     * @return Response
     */
    public function index()
    {
        $title = 'Index - post';
        $images = Image::paginate(10);

        return view('image.index')->with('images', $images);
    }

    /**
     * Show the form for creating a new Image.
     *
     * @return Response
     */
    public function create()
    {
        return view('image.create');
    }

    /**
     * Store a newly created Image in storage.
     *
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $path = Storage::putFile('public', $request->file('upload'), 'public');
        $image = new Image();
        $image->path = Storage::url($path);
        $image->user_id = \Auth::user()->id;
        $image->name = $request->file('upload')->getClientOriginalName();
        $image->size = $request->file('upload')->getClientSize();
        $image->save();

        return redirect(route('image.index'));
    }

    /**
     * Display the specified Image.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $image = Image::findOrFail($id);

        if (empty($image)) {
            return redirect(route('images.index'));
        }

        return view('image.show')->with('image', $image);
    }

    /**
     * Show the form for editing the specified Image.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $image = Image::findOrFail($id);

        if (empty($image)) {
            return redirect(route('images.index'));
        }

        return view('image.edit')->with('image', $image);
    }

    /**
     * Update the specified Image in storage.
     *
     * @param  int              $id
     * @param UpdateImageRequest $request
     *
     * @return Response
     */
    public function update($id, $request)
    {
        $image = Image::findOrFail($id);

        if (empty($image)) {
            return redirect(route('images.index'));
        }

        $image->update($request->all());
        return redirect(route('images.index'));
    }

    /**
     * Remove the specified Image from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $image = Image::findOrFail($id);

        if (empty($image)) {
            return redirect(route('images.index'));
        }

        $image->delete();

        return redirect(route('images.index'));
    }
}
