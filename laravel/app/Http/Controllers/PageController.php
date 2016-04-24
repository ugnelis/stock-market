<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

use App\Http\Requests;
use App\Page;
use Auth;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['show']]);
    }

    /**
     * Display a listing of the pages.
     *
     * @return Response
     */
    public function index()
    {
        // Check if user has rights
        $user = Auth::user();
        if (!$user->hasRole(['admin', 'moderator'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $page = Page::all();
        return response()->json($page);
    }

    /**
     * Store a newly created page in storage.
     *
     * @return Response
     */
    public function store()
    {
        // Check if user has rights
        $user = Auth::user();
        if (!$user->hasRole(['admin', 'moderator'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $rules = array(
            'heading' => 'required',
            'content' => 'required',
            'page_title' => 'required'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            // Generate an error message
            $errors = array();
            foreach ($validator->errors()->toArray() as $error)
                $errors = array_merge($errors, $error);

            return response()->json(['error' => $errors], Response::HTTP_CONFLICT);
        }

        // Store
        $page = new Page;
        $page->heading = Input::get('heading');
        $page->content = Input::get('content');
        $page->uri = Input::get('uri');
        $page->page_title = Input::get('page_title');
        $page->meta_description = Input::get('meta_description');
        $page->meta_keywords = Input::get('meta_keywords');
        $page->status = Input::get('status');
        $page->published_date = Input::get('published_date');
        $page->save();

        return response()->json(['success' => 'Page is created!']);
    }

    /**
     * Display the specified page.
     *
     * @param  string $uri
     * @return Response
     */
    public function show($uri)
    {
        $page = Page::findBySlug($uri);

        if (!$page) {
            return response()->json(['error' => 'Could not find a page.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($page);
    }

    /**
     * Update the specified page in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        // Check if user has rights
        $user = Auth::user();
        if (!$user->hasRole(['admin', 'moderator'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $rules = array(
            'heading' => 'required',
            'content' => 'required',
            'page_title' => 'required'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            // Generate an error message
            $errors = array();
            foreach ($validator->errors()->toArray() as $error)
                $errors = array_merge($errors, $error);

            return response()->json(['error' => $errors], Response::HTTP_CONFLICT);
        }

        // Store
        $page = Page::find($id);
        $page->heading = Input::get('heading');
        $page->content = Input::get('content');
        $page->uri = Input::get('uri');
        $page->page_title = Input::get('page_title');
        $page->meta_description = Input::get('meta_description');
        $page->meta_keywords = Input::get('meta_keywords');
        $page->status = Input::get('status');
        $page->published_date = Input::get('published_date');
        $page->save();

        return response()->json(['success' => 'Page is updated!']);
    }

    /**
     * Remove the specified page from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function remove($id)
    {
        // Check if user has rights
        $user = Auth::user();
        if (!$user->hasRole(['admin', 'moderator'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $page = Page::find($id);
        if ($page === null) {
            return response()->json(['error' => 'Page does not exist.'], Response::HTTP_CONFLICT);
        }

        $page->delete();

        return response()->json(['success' => 'Page is removed.']);
    }
}
