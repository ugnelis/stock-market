<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Page extends Model implements SluggableInterface
{
    use SluggableTrait;

    /**
     * Status values for the database
     */
    const DRAFT = 'DRAFT';
    const APPROVED = 'APPROVED';

    /**
     * @var bool
     */
    protected $softDelete = true;

    /**
     * Used for Cviebrock/EloquentSluggable
     * @var array
     */
    protected $sluggable = array(
        'build_from' => 'heading',
        'save_to' => 'uri',
        'separator' => '-',
        'unique' => true,
        'include_trashed' => true,
    );

    /**
     * Returns the page object for the given slug
     * @param $uri
     * @return mixed
     */
    public function get($uri)
    {
        return self::where('uri','=',$uri)
            ->where('status','=',Page::APPROVED)
            ->first();
            //->where('published_date','<=',\Carbon\Carbon::now())
    }
}
