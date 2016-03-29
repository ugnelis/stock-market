<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Page extends Model implements SluggableInterface
{
    use SoftDeletes;
    use SluggableTrait;

    /**
     * Status values for the database
     */
    const DRAFT = 'DRAFT';
    const APPROVED = 'APPROVED';

    protected $dates = ['deleted_at'];

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
}
