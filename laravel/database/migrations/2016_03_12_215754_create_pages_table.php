<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('heading');
            $table->text('content');
            $table->string('uri')->unique();
            $table->text('page_title');
            $table->text('meta_description');
            $table->text('meta_keywords');
            $table->enum('status', array('DRAFT', 'APPROVED'))->default('DRAFT');
            $table->dateTime('published_date');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pages');
    }
}
