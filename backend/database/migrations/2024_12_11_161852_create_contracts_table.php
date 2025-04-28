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
        Schema::create('contracts', static function (Blueprint $table) {
            $table->id();
            $table->string('name', 80)->comment("契約名: ex: 会社名、担当者名");
            $table->string('key', 50)->unique()->comment("契約キー。ex: 契約を識別するためURLに利用など");
            $table->string('key_alias', 5)->comment("短縮キー。ex: 機種変更どきのコードプレフィックスなどに利用する");
            $table->string('person_in_charge', 100)->nullable()->comment("担当者名");
            $table->string('tel', 20)->nullable()->comment("担当者電話番号");
            $table->string('email', 255)->nullable()->comment("担当者メールアドレス");
            $table->string('industry', 50)->nullable()->comment("業種");
            $table->string('memo', 2000)->nullable()->comment("メモ");
            $table->string("line_access_token", 255)->nullable()->comment("LINEチャネルアクセストークン、MessagingAPIで利用");
            $table->tinyInteger('contract_status')->comment("契約状態");
            $table->tinyInteger('contract_app_type')->comment("アプリの形態。LINE版、ネイティブ版など");

            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('contracts');
        Schema::enableForeignKeyConstraints();
    }
};
