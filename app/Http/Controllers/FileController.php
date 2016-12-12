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
        $rules = array('image' => 'required',); //mimes:jpeg,bmp,png and for max size max:10000
        // doing the validation, passing post data, rules and the messages
        $validator = Validator::make($file, $rules);
        if ($validator->fails()) {
            // send back to the page with the input data and errors
            return back()->withInput()->withErrors($validator);
        }
        else {
            // checking file is valid.
            if ($request->file('image')->isValid()) {
                $destinationPath = 'uploads'; // upload path
                $extension = $request->file('image')->getClientOriginalExtension(); // getting image extension
                $fileName = rand(11111,99999).'.'.$extension; // renameing image
                $request->file('image')->move($destinationPath, $fileName); // uploading file to given path
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
