<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Auto3dprintqueue;
use Amranidev\Ajaxis\Ajaxis;
use URL;

use App\Auto3dprintercolor;


use App\Auto3dprintmaterial;

use Storage;
use App\User;
use Mail;
use Jenssegers\Agent\Agent;



/**
 * Class Auto3dprintqueueController.
 *
 * @author  The scaffold-interface created at 2017-03-14 06:02:31am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintqueueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $title = 'Index - 3D Print Queue (Just You)';

        if ($request->id == "all") {
            $auto3dprintqueues = Auto3dprintqueue::orderBy('created_at', 'dec')->paginate(50);
        } else {
            if ($request->id == "") {
                $auto3dprintqueues = Auto3dprintqueue::where('user_id', \Auth::user()->id)->orderBy('created_at', 'dec')->paginate(6);

            } else {
                $auto3dprintqueues = Auto3dprintqueue::where('user_id', $request->id)->orderBy('created_at', 'dec')->paginate(6);

            }
        }


        return view('auto3dprintqueue.index', compact('auto3dprintqueues', 'title'));
    }

    public function AllUserindex(Request $request)
    {
        $title = 'Index - 3D Print Queue (All Users)';
        $auto3dprintqueues = Auto3dprintqueue::orderBy('created_at', 'dec')->paginate(6);

        // \Auth::user()->id

        return view('auto3dprintqueue.index', compact('auto3dprintqueues', 'title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - auto3dprintqueue';


        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material', 'id');

        $users = User::all()->pluck('name', 'id');

        return view('auto3dprintqueue.create', compact('title', 'auto3dprintmaterials', 'users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        //dd($request);
        $auto3dprintqueue = new Auto3dprintqueue();


        $auto3dprintqueue->Name = $request->file('upload')->getClientOriginalName();

        $auto3dprintqueue->path = '';

        $auto3dprintqueue->Infill = $request->Infill;
        if ($auto3dprintqueue->Infill > 99) {
            $auto3dprintqueue->Infill = 99;
        }

        $auto3dprintqueue->Status = "";


        $auto3dprintqueue->Notified = 0;

        $auto3dprintqueue->genenerateSupport = $request->genenerateSupport;


        $auto3dprintqueue->auto3dprintercolor_id = $request->auto3dprintercolor_id;


        $auto3dprintqueue->auto3dprintmaterial_id = $request->auto3dprintmaterial_id;


        $auto3dprintqueue->user_id = \Auth::user()->id;


        $auto3dprintqueue->save();

        $path = Storage::putFileAs('3dPrintFiles', $request->file('upload'), $auto3dprintqueue->id . ".stl", 'public');

        Storage::disk('local')->put("3dPrintFiles\\" . $auto3dprintqueue->id . ".scad", "import(\"" . $auto3dprintqueue->id . ".stl\");");


        $pusher = App::make('pusher');

        SliceModel($auto3dprintqueue->id);


        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
            'test-event',
            ['message' => 'A new auto3dprintqueue has been created !!']);

        return redirect('auto3dprintqueue/' . $auto3dprintqueue->id . "/");
    }


    /**
     * @param $auto3dprintqueue
     */






    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $title = 'Show - auto3dprintqueue';
        $agent = new Agent();


        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);

        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material', 'id');

        if ($request->printnow == "true") {
            $auto3dprintqueue->Status = "print";

            $auto3dprintqueue->save();

            if ($request->ajax()) {
                return URL::to('auto3dprintqueue');
            }



            return redirect('auto3dprintqueue/' . $auto3dprintqueue->id . "/");
        }


        return view('auto3dprintqueue.show', compact('title', 'auto3dprintqueue', 'auto3dprintmaterials', 'agent'));
    }


    public function showPNG($id, Request $request)
    {
        $title = 'Show - auto3dprintcue';

        if ($request->ajax()) {
            return URL::to('auto3dprintcue/' . $id);
        }


        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/" . $id . ".png");
        return response($myyfileout, 200)->header('Content-Type', 'image/png');
    }


    public function showSTL($id, Request $request)
    {
        $title = 'Show - auto3dprintcue';

        if ($request->ajax()) {
            return URL::to('auto3dprintcue/' . $id);
        }


        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/" . $id . ".stl");
        return response($myyfileout, 200)->header('Content-Type', 'application/octet-stream');
    }


    public function showGcode($id, Request $request)
    {
        $title = 'Show - auto3dprintcue';

        if ($request->ajax()) {
            return URL::to('auto3dprintcue/' . $id);
        }
        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/" . $id . ".gcode");

        return response($myyfileout, 200)->header('Content-Type', 'text/text');
    }


    public function PrinterReceiveGcode(Request $request)
    {

        if ($request->input('jobID', "") != "") {
            $auto3dprintqueue = Auto3dprintqueue::findOrfail($request->jobID);

            $auto3dprintqueue->Status = $request->stat;

            $auto3dprintqueue->save();
            $myyfileout = "Status Recorded";
            sendEmailReminder($auto3dprintqueue->id);
        } else {


            try {
                // try code
                $auto3dprintqueue = Auto3dprintqueue::where([
                    ['Status', 'print'],
                    ['SizeX', '<=', $request->SizeX],
                    ['SizeY', '<=', $request->SizeY],
                    ['SizeZ', '<=', $request->SizeZ],
                ])->first();
                $test = $auto3dprintqueue->id;
            } catch (\Exception $e) {
                $myyfileout = "No Print Jobs Available";
                return response($myyfileout, 200)->header('Content-Type', 'text/text');
            }


            if ($request->input('name', "") != "") {
                //$auto3dprintqueue = Auto3dprintqueue::findOrfail($id);

                $auto3dprintqueue->Status = "Printing On :" . $request->name;

                $auto3dprintqueue->save();

                $myyfileout = file_get_contents("../storage/app/3dPrintFiles/" . $auto3dprintqueue->id . ".gcode");
                $myyfileout =
                    ";start\n" .
                    ";Print id is\n" .
                    ";" . $auto3dprintqueue->id . "\n" .
                    "; User Name:" . $auto3dprintqueue->user->username . "\n" .
                    ";          :" . $auto3dprintqueue->user->name . "\n" .
                    ";User Phone:" . $auto3dprintqueue->user->phone . "\n" .
                    "; File Name:" . $auto3dprintqueue->Name . "\n" .
                    ";" . "\n" .
                    ";" . "\n" .
                    ";" . "\n" .
                    $myyfileout;

                sendEmailReminder($auto3dprintqueue->id);

            } else {
                $myyfileout = "Must Supply Printer name";

            }
        }

        return response($myyfileout, 200)->header('Content-Type', 'text/text');
    }


    public function showGcodeViewer($id, Request $request)
    {
        $title = 'Show - auto3dprintcue';

        if ($request->ajax()) {
            return URL::to('auto3dprintcue/' . $id);
        }
        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);


        if (file_exists("../storage/app/3dPrintFiles/" . $id . ".gcode") === FALSE) {
            return response("<meta http-equiv=\"refresh\"
   content=\"5\";> Please wait while model is sliced


   <img src=\"../../../../auto3dprintqueue/" . $auto3dprintqueue->id . "/thumb.png\" ></img>", 200);
        }
        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/" . $id . ".gcode");
        return view('auto3dprintqueue.showGcode', compact('title', 'auto3dprintqueue'))->with('MyGcode', $myyfileout);
    }


    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        $title = 'Edit - auto3dprintqueue';
        if ($request->ajax()) {
            return URL::to('auto3dprintqueue/' . $id . '/edit');
        }




        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material', 'id');


        $users = User::all()->pluck('name', 'id');


        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
        return view('auto3dprintqueue.edit', compact('title', 'auto3dprintqueue', 'auto3dprintmaterials', 'users'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);

        $auto3dprintqueue->Infill = $request->Infill;
        $auto3dprintqueue->genenerateSupport = $request->genenerateSupport;

        $auto3dprintqueue->auto3dprintmaterial_id = $request->auto3dprintmaterial_id;


        $auto3dprintqueue->save();
        SliceModel($auto3dprintqueue->id);
        return redirect('auto3dprintqueue/' . $auto3dprintqueue->id . "/");
    }

    /**
     * Delete confirmation message by Ajaxis.
     *
     * @link      https://github.com/amranidev/ajaxis
     * @param    \Illuminate\Http\Request $request
     * @return  String
     */
    public function DeleteMsg($id, Request $request)
    {
        $msg = Ajaxis::BtDeleting('Warning!!', 'Would you like to remove This?', '/auto3dprintqueue/' . $id . '/delete');

        if ($request->ajax()) {
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
        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
        $auto3dprintqueue->delete();
        return URL::to('auto3dprintqueue');
    }


}

function execInBackground($cmd)
{
    if (substr(php_uname(), 0, 7) == "Windows") {
        pclose(popen("start /B " . $cmd, "r"));
    } else {
        exec($cmd . " > /dev/null &");
    }
}


function sendEmailReminder($id)
{
    //add toggle for email on/off here
    return;

    $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
    $user = User::findOrFail($auto3dprintqueue->user->id);

    Mail::send('auto3dprintqueue.email', ['user' => $user, 'auto3dprintqueue' => $auto3dprintqueue], function ($m) use ($user,$auto3dprintqueue) {
        $m->from('3dprinting@smbisoft.com', '3d Print Complete.');


        $mysubject = "3d Print id # (" . $auto3dprintqueue->id . ")    Status has changed to ".$auto3dprintqueue->Status;
        $m->to($user->email, $user->name)->subject($mysubject);
    });
}

function SliceModel($id)
{
    $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);


    $gensupport = "";
    if ($auto3dprintqueue->genenerateSupport == 1)
    {
        $gensupport =  "  --support-material  ";
    }


    if (env('APP_PLATFORM') == 'WIN') {
        $slicerPath       = '..\\slic3r\\slic3r-console.exe';
        $openScadPath     = '..\\slic3r\\openscad\\openscad.com';
        $storagePath      = '..\\storage\\app\\3dPrintFiles\\';
        $SlicerConfigPath = '..\\slic3r\\test.ini';
    }


    if (env('APP_PLATFORM') == 'LINUX') {
        $slicerPath       = '/usr/bin/slic3r';
        $openScadPath     = '/usr/bin/openscad';
        $storagePath      = '../storage/app/3dPrintFiles/';
        $SlicerConfigPath = '../Slic3r/test.ini';
    }

    if (env('APP_PLATFORM') == 'MAC') {
        $slicerPath       = '/Applications/Slic3r.app/Contents/MacOS/slic3r';
        $openScadPath     = '/Applications/OpenSCAD.app/Contents/MacOS/openscad';
        $storagePath      = '../storage/app/3dPrintFiles/';
        $SlicerConfigPath = '../Slic3r/test.ini';
    }



    $OpenScadThumnailGen   = $openScadPath . " ". $storagePath . $auto3dprintqueue->id . ".scad -o " . $storagePath  . $auto3dprintqueue->id . ".png"  ;
    $RunSlicerToSlice      = $slicerPath . " ". $storagePath . $auto3dprintqueue->id  . ".stl  --load \"" . $SlicerConfigPath . "\"  --fill-density " . $auto3dprintqueue->Infill .  $gensupport."  --print-center 0,0"   ;
    $runSlcerForDimensions = $slicerPath . " ". $storagePath . $auto3dprintqueue->id  . ".stl --info --load \"" . $SlicerConfigPath . "\"  --fill-density " . $auto3dprintqueue->Infill .  $gensupport."  --print-center 0,0"   ;



    
    
    $OpenScadResult   = shell_exec($OpenScadThumnailGen);
    $slicerResult     = shell_exec($RunSlicerToSlice );
    $slicerDimensions = shell_exec($runSlcerForDimensions);

//testing for platform command functionality. This line should remain commented out in production.
dd($OpenScadResult, $slicerResult, $slicerDimensions, $OpenScadThumnailGen, $RunSlicerToSlice, $runSlcerForDimensions);

    
//Get Dimension of print to check bed size 
    $slicerDimensions = strtoupper($slicerDimensions);
    $slicerDimensions = str_replace("\n", " ", $slicerDimensions);


    $auto3dprintqueue1 = Auto3dprintqueue::findOrfail($auto3dprintqueue->id);
    $auto3dprintqueue1->SlicerResults = $slicerDimensions;

    $pieces = array_filter(explode(" ", $slicerDimensions));

    $auto3dprintqueue1->SizeX = intval(str_after($pieces[19], "X="));
    $auto3dprintqueue1->SizeY = intval(str_after($pieces[20], "Y="));
    $auto3dprintqueue1->SizeZ = intval(str_after($pieces[21], "Z="));

//get filament quanity
    $pieces = trim (array_filter(explode(":", $slicerResult))[1]);
    $pieces = str_replace("mm", "",  $pieces);
    $pieces = trim (array_filter(explode(" ", $pieces))[0]);

    $auto3dprintqueue1->filament_used= intval($pieces);
    $auto3dprintqueue1->save();

}
