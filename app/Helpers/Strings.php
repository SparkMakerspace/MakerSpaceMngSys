<?php
/**
 * Created by PhpStorm.
 * User: John
 * Date: 3/10/2017
 * Time: 4:24 PM
 */

namespace App\Helpers;

class Strings
{

    static function shorten_string($string, $wordsreturned)
        /*  Returns the first $wordsreturned out of $string.  If string
        contains fewer words than $wordsreturned, the entire string
        is returned.
        */
    {
        $retval = $string;      //  Just in case of a problem

        $array = explode(" ", $string);
        if (count($array) <= $wordsreturned) /*  Already short enough, return the whole thing
        */ {
            $retval = $string;
        } else /*  Need to chop of some words
        */ {
            array_splice($array, $wordsreturned);
            $retval = implode(" ", $array) . " ...";
        }
        return $retval;
    }
}