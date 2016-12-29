<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;
use Session;
use Validator;


class FileController extends Controller
{
    public function create() {
        return view('files.upload');
    }

    public function store(Request $request){
        // getting all of the post data
        $file = array('image' => $request->file('image'));
        // setting up rules
        $rules = array('image' => ['required', 'max:220000']); //mimes:jpeg,bmp,png and for max size max:10000
        // doing the validation, passing post data, rules and the messages
        $validator = Validator::make($file, $rules);
        if ($validator->fails()) {
            // send back to the page with the input data and errors
            return back()->withInput()->withErrors($validator);
        }
        else {
            // checking file is valid.
            if ($request->file('image')->isValid()) {
                $path = $request->file('image')->store('uploads'); // uploading file to given path
                $originalFilename = $request->file('image')->getClientOriginalName();
                $size = $request->file('image')->getSize();
                $type = 'image';
                $user_id = \Auth::user()->id;
                $array = ['path'=>$path,'originalname'=>$originalFilename,'size'=>$size,'type'=>$type,'user_id'=>$user_id];
                $file = File::create($array);
                // sending back with message
                Session::flash('success', 'File successfully uploaded!');
                return back();
            }
            else {
                // sending back with error message.
                Session::flash('error', 'uploaded file is not valid');
                return back();
            }
        }
    }

    public function destroy(File $file){
        $file->delete();
    }

    public function show(File $file){
        return $file;
    }
}
