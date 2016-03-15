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
            'content' => 'Stock Market is a project for &#39;Computer Networks and Internet Technologies&#39; module.',
            'page_title' => 'Home!',
            'meta_description' => 'This is meta description.',
            'meta_keywords' => 'This is meta keywords.',
            'status' => 'APPROVED'
        ]);
        $page->save();

        $page = new Page([
            'heading' => 'About',
            'content' => '<p>Stock Market is a project for &#39;Computer Networks and Internet Technologies&#39; module.</p><p>Author: <strong>Ugnius Malūkas</strong> (<a href="https://github.com/ugnelis">Github</a>, <a href="https://lt.linkedin.com/in/malukas">LinkedIn</a>)</p>',
            'page_title' => 'About',
            'meta_description' => 'This is meta description.',
            'meta_keywords' => 'This is meta keywords.',
            'status' => 'APPROVED'
        ]);
        $page->save();
    }
}
