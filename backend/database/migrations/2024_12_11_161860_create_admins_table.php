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
        Schema::create('admins', static function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contract_id')->nullable()->comment("契約ID： 最上位のシステム管理者のみnull");
            $table->unsignedBigInteger('shop_id')->nullable()->comment("支店ID");

            $table->string('login_id', 50)->unique()->comment("ログインID");
            $table->string('password')->comment("パスワード");
            $table->dateTime('last_login_at')->nullable()->comment("最終ログイン日時");
            $table->tinyInteger('role')->comment("権限");
            $table->string('avatar_image_path')->nullable()->comment("アバター画像相対パス");
            $table->string('firebase_auth_uid', 128)->unique()->comment("Firebase Auth UID");
            $table->rememberToken();

            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->dateTime('deleted_at')->nullable();

            $table->foreign('contract_id')->references('id')->on('contracts');
            $table->foreign('shop_id')->references('id')->on('shops');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('admins');
        Schema::enableForeignKeyConstraints();
    }
};
