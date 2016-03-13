<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Symfony\Component\HttpFoundation\Response;
use App\Page;
use Auth;

class PageController extends Controller
{
    protected $page;

    public function __construct(Page $page)
    {
        $this->middleware('jwt.auth', ['except' => ['show']]);
        $this->page = $page;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user->hasRole(['owner', 'moderator'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $page = $page = $this->page->all();
        return response()->json($page);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  string $uri
     * @return Response
     */
    public function show($uri)
    {
        $page = $this->page->get($uri);

        if (!$page) {
            return response()->json(['error' => 'Could not find a page.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($page);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user->hasRole(['owner', 'moderator'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $page = Page::find($id);
        $page->delete();

        return response()->json(['success' => 'Page is removed.']);
    }
}
