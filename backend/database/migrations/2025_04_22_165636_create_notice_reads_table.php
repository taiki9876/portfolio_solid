<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * お知らせの既読管理テーブル
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('notice_reads', static function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('management_notice_id');
            $table->unsignedBigInteger('admin_id');
            $table->dateTime('read_at')->useCurrent();
            $table->dateTime('created_at')->useCurrent();

            $table->foreign('management_notice_id')->references('id')->on('management_notices')->onDelete('cascade');
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_images');
    }
};
