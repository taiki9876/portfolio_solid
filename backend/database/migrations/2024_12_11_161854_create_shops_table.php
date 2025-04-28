<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shops', static function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contract_id')->comment("契約ID： 最上位のシステム管理者のみnull");

            $table->string('name', 200)->comment("店名");
            $table->string('app_display_name', 200)->nullable()->comment("アプリ表示名");
            $table->string('business_hours', 255)->nullable()->comment("営業時間");
            $table->string('rest', 255)->nullable()->comment("定休日");
            $table->string('tel', 200)->nullable()->comment("電話番号");
            $table->string('address', 255)->nullable()->comment("住所");
            $table->text('prelusion')->nullable()->comment("紹介文");
            $table->string('hp_url', 255)->nullable()->comment("ホームページのURL");
            $table->string('map_url', 255)->nullable()->comment("GooglマップURL");

            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->dateTime('deleted_at')->nullable();

            $table->foreign('contract_id')->references('id')->on('contracts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('shops');
        Schema::enableForeignKeyConstraints();
    }
};
