<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('users_id')->unique();
            $table->foreign('users_id')->references('id')->on('users')
                ->onDelete('cascade');
            $table->string('no', 150)->nullable();
            $table->dateTime('tgl')->nullable();
            $table->string('pelapor', 150)->nullable();
            $table->text('kejadian')->nullable();
            $table->string('pidana', 150)->nullable();
            $table->string('terlapor', 150)->nullable();
            $table->text('tindak_lanjut')->nullable();
            $table->string('progres', 10)->default("Proses");
            $table->json('file')->nullable();
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
        Schema::dropIfExists('report');
    }
};
