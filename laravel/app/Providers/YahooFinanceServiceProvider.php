<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\YahooFinance;

class YahooFinanceServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register YahooFinance service.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('YahooFinance', function ($app) {;
            return new YahooFinance();
        });
    }
}
