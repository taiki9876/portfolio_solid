<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create('customers', static function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contract_id')->comment('契約ID');
            $table->unsignedBigInteger('shop_id')->nullable()->comment("支店ID");

            $table->string('first_name', 255)->nullable()->comment("名※POS連携");
            $table->string('last_name', 255)->nullable()->comment("姓※POS連携");
            $table->string('first_name_kana', 255)->nullable()->comment("名カナ※POS連携");
            $table->string('last_name_kana', 255)->nullable()->comment("姓カナ※POS連携");
            $table->string('full_name', 255)->comment("フルネーム");
            $table->date('birth_date')->nullable()->comment("生年月日");
            $table->tinyInteger('sex')->default(0)->comment("0: 不明、1: 男性, 2: 女性");
            $table->string('email', 255)->nullable()->comment("メールアドレス");
            $table->string('phone_number', 20)->nullable()->comment("電話番号");
            $table->string('post_code', 8)->nullable()->comment("郵便番号");
            $table->string('address', 255)->nullable()->comment("住所");

            $table->string('avatar_image_path')->nullable()->comment("アバター画像相対パス");
            $table->boolean('is_email_opt_in')->default(0)->comment("案内メール配信設定 0: 受信不可, 1: 受信可");
            $table->dateTime('last_visit_at')->nullable()->comment("最終来店日");
            $table->date("entry_at")->nullable()->comment("会員入会日");
            $table->date("leave_at")->nullable()->comment("会員退会日");

            $table->unsignedBigInteger('favorite_shop_id')->nullable()->comment('よく行くお店');
            $table->text('memo')->nullable()->comment("顧客メモ");
            $table->string('firebase_auth_uid', 128)->unique()->comment("Firebase Auth UID");

            $table->dateTime('created_at');
            $table->dateTime('updated_at');
            $table->dateTime('deleted_at')->nullable()->comment("アカウント停止日");

            $table->foreign('contract_id')->references('id')->on('contracts');
            $table->foreign('shop_id')->references('id')->on('shops');
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
