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
        Schema::create('employe', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('users_id')->nullable();
            $table->foreign('users_id')->references('id')->on('users');
            $table->unsignedBigInteger('store_id')->nullable();
            $table->foreign('store_id')->references('id')->on('store');
            $table->string('name', 50)->unique();
            $table->string('code', 20)->unique()->nullable();
            $table->date('date_of_birth');
            $table->date('date_of_entry');
            $table->string('birth_of_place');
            $table->string('religion', 20);
            $table->string('gender', 20);
            $table->string('address');
            $table->string('whatsapp', 15);
            $table->string('position', 20);
            $table->string('division', 20);
            $table->boolean('active');
            $table->string('img')->nullable();
            $table->boolean('delete')->default(false);
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
        Schema::dropIfExists('employe');
    }
};
