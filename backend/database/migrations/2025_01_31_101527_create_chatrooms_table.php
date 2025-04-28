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
        Schema::create('chatrooms', static function (Blueprint $table) {
            $table->id();
            $table->string('contract_key', 50)->comment("契約キー");
            $table->boolean('is_processed')->default(0)->comment("対応済みフラグ");
            $table->boolean('is_spam')->default(0)->comment("スパムフラグ");
            $table->tinyInteger('chat_type')->comment("店舗チャットか、個人（スタッフ）チャットか？などのカテゴリ");
            $table->string('last_message', 255)->nullable();
            $table->dateTime('last_message_updated_at')->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->dateTime('deleted_at')->nullable();

            $table->foreign('contract_key')->references('key')->on('contracts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('chatrooms');
        Schema::enableForeignKeyConstraints();
    }
};
