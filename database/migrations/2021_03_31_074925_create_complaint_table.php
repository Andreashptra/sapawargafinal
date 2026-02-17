<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComplaintTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('complaint', function (Blueprint $table) {
            $table->id();
            $table->date('date_complaint');
            $table->string('nik');
            $table->text('contents_of_the_report');
            $table->string('photo');
            $table->enum('status', ['0', 'process', 'finished']);
            $table->unsignedBigInteger('society_id')->nullable();
            $table->foreign('society_id')->references('id')->on('society')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('complaint');
    }
}
