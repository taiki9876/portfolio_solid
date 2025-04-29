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
        Schema::create('management_notices', static function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->comment('お知らせタイトル');
            $table->text('content')->comment('お知らせ内容');
            $table->boolean('is_published')->default(false)->comment('公開フラグ、非公開はこの設定が最優先される');
            $table->boolean('show_popup')->default(false)->comment('ポップアップ表示するかどうか');
            $table->tinyInteger('contract_app_type')->nullable()->comment("LIne版、ネイティブ版などのフィルタリング用。NULLなら条件なし");
            $table->dateTime('published_at')->comment('公開日時');
            $table->dateTime('unpublished_at')->nullable()->comment('非公開日時');
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('management_notices');
    }
};
