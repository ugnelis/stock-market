<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'inventories';

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    public function stock()
    {
        return $this->belongsTo('App\Stock', 'stock_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
