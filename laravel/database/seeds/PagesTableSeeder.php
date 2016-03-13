<?php

use Illuminate\Database\Seeder;
use App\Page;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pages')->delete();

        $page = new Page([
            'heading' => 'Home',
            'content' => 'It works!',
            'page_title' => 'Home!',
            'meta_description' => 'This is meta description.',
            'meta_keywords' => 'This is meta keywords.',
            'status' => 'APPROVED'
        ]);
        $page->save();
    }
}
