<?php

namespace App\Http\Requests;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        User::first()->can();
        return $this->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Post::$rules;
    }
}
