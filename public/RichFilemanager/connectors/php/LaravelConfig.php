<?php
/**
 *  LaravelConfig PHP class
 * 
 *  The original work by Simon Georget filemanager.php
 *
 *  filemanager.php
 *  use for ckeditor filemanager
 *
 *  @license  MIT License
 *  @author   Simon Georget <simon (at) linea21 (dot) com>
 *  @author   Tomás Flores <cognitus (at) outlook (dot) com>
 *  @copyright  Authors
 */

class LaravelConfig
{ 
  private $app;

  private function init() {
    // Laravel init
    require getcwd() . '/../../../../bootstrap/autoload.php';
    $app = require_once getcwd() . '/../../../../bootstrap/app.php';

    $kernel = $app->make('Illuminate\Contracts\Http\Kernel');

    $response = $kernel->handle(
      $request = Illuminate\Http\Request::capture()
    );

    $id = $app['encrypter']->decrypt($_COOKIE[$app['config']['session.cookie']]);
    $app['session']->driver()->setId($id);
    $app['session']->driver()->start();

    $this->app = $app; 
  }
 


/**
 * laravel check auth and folders
 *
 * @return  Object $laravelData
 *          auth - (bool) if user is logged
 *          folder - relative path
 */ 
  public function getInstance(){
    $this->init();
    $app = $this->app;
    // Folder path
    $folderPath = $app->basePath() . '/public/'.config('richfilemanager.url-files');
    //relative path
    $folderRelativePath = config('richfilemanager.url-files');
    
    // Check if user in authentified
    if(!$app['auth']->check()) 
    {
      $laravelAuth = false;
    } 
    else 
    {
      // Check if user has all access
      if($app['auth']->user()->accessMediasAll()){
      	$laravelAuth = true;
      } 
      elseif(method_exists($app['auth']->user(), 'accessMediasFolder')){
      	// Check if user has access to one folder
      	if($app['auth']->user()->accessMediasFolder()){
      	  // Folder name with user id
      	  $folderPath  .= 'user' . $app['auth']->id();
      	  // Create folder if doesn't exist
      	  if (!is_dir($folderPath))
      	  {
      	    mkdir($folderPath); 
      	  }  
      	  $laravelAuth = true; 
      	  //folder relative path
      	  $folderRelativePath  .= 'user' . $app['auth']->id().'/';
      	} 
    	  else{
    	   $laravelAuth = false;
        }    
      }
      else
      {
  	   $laravelAuth = false;
      } 
    }
    $laravelData = new stdClass();
    $laravelData->auth = $laravelAuth;
    $laravelData->folder = $folderRelativePath;
  
    return $laravelData;
  }
  
}
