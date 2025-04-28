<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\Api\AuthController as ApiAuthController;
use App\Http\Controllers\Admin\Api\ChatController;
use App\Http\Controllers\Admin\Api\CustomerController;
use App\Http\Controllers\Admin\Api\HomeController as ApiHomeController;
use App\Http\Controllers\Admin\Api\ManagementNoticeController;
use App\Http\Controllers\Admin\Api\SystemAdmin\SystemAdminController;
use App\Http\Controllers\Admin\Api\SystemAdmin\SystemAdminManagementNoticeController;
use App\Http\Controllers\Admin\Api\SystemAdmin\SystemAdminShopController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\Web\AuthController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::prefix('admin')->group(static function () {
    Route::middleware(['guest:admin'])->group(static function () {
        Route::get('/login', [AuthController::class, 'showLoginForm'])->name('showLoginForm');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
    });

    Route::middleware(['auth:admin'])->group(static function () {
        Route::get('/404', static fn () => abort(Response::HTTP_NOT_FOUND));
        Route::get('/403', static fn () => abort(Response::HTTP_FORBIDDEN));
        Route::get('/500', static fn () => abort(Response::HTTP_INTERNAL_SERVER_ERROR));

        // --- 管理系API
        Route::prefix('api')->name('api.')->group(static function () {
            Route::get('/profile', [ApiAuthController::class, 'profile'])->name('profile');

            //>>---- システム管理者向けAPI ----
            Route::get('system-admin/contracts', [SystemAdminController::class, 'fetchContractList'])->name('systemAdmin.contractList')->middleware('can:act-as-system-admin');
            Route::get('system-admin/contracts/{contract_id}/name', [SystemAdminController::class, 'fetchContractName'])->name('systemAdmin.fetchContractName')->middleware('can:act-as-system-admin');
            Route::get('system-admin/contracts/{contract_id}', [SystemAdminController::class, 'fetchContract'])->name('systemAdmin.fetchContract')->middleware('can:act-as-system-admin');
            Route::patch('system-admin/contracts/{contract_id}', [SystemAdminController::class, 'editContract'])->name('systemAdmin.editContract')->middleware('can:act-as-system-admin');
            Route::post('system-admin/contracts', [SystemAdminController::class, 'createContract'])->name('systemAdmin.createContract')->middleware('can:act-as-system-admin');

            Route::get('system-admin/contracts/{contract_id}/shops', [SystemAdminShopController::class, 'fetchShopList'])->name('systemAdmin.fetchShopList')->middleware('can:act-as-system-admin');
            Route::get('system-admin/contracts/{contract_id}/shops/{shop_id}', [SystemAdminShopController::class, 'fetchShop'])->name('systemAdmin.fetchShop')->middleware('can:act-as-system-admin');
            Route::post('system-admin/contracts/{contract_id}/shops/{shop_id}', [SystemAdminShopController::class, 'editShop'])->name('systemAdmin.editShop')->middleware('can:act-as-system-admin');//NOTE: 画像を扱うのでpatchはNG
            Route::delete('system-admin/contracts/{contract_id}/shops/{shop_id}', [SystemAdminShopController::class, 'deleteShop'])->name('systemAdmin.deleteShop')->middleware('can:act-as-system-admin');//NOTE: 画像を扱うのでpatchはNG
            Route::post('system-admin/contracts/{contract_id}/shops', [SystemAdminShopController::class, 'createShop'])->name('systemAdmin.createShop')->middleware('can:act-as-system-admin');

            Route::get('system-admin/management-notices', [SystemAdminManagementNoticeController::class, 'fetchManagementNotices'])->name('systemAdmin.fetchManagementNotices')->middleware('can:act-as-system-admin');
            Route::get('system-admin/management-notices/{notice_id}', [SystemAdminManagementNoticeController::class, 'fetchManagementNotice'])->name('systemAdmin.fetchManagementNotice')->middleware('can:act-as-system-admin');
            Route::patch('system-admin/management-notices/{notice_id}', [SystemAdminManagementNoticeController::class, 'editManagementNotice'])->name('systemAdmin.editManagementNotice')->middleware('can:act-as-system-admin');
            Route::delete('system-admin/management-notices/{notice_id}', [SystemAdminManagementNoticeController::class, 'deleteManagementNotice'])->name('systemAdmin.deleteManagementNotice')->middleware('can:act-as-system-admin');
            Route::post('system-admin/management-notices', [SystemAdminManagementNoticeController::class, 'createManagementNotice'])->name('systemAdmin.createManagementNotice')->middleware('can:act-as-system-admin');

            Route::post('system-admin/change-support-account', [SystemAdminController::class, 'changeSupportAccount'])->name('systemAdmin.changeSupportAccount')->middleware('can:act-as-system-admin');
            Route::post('system-admin/change-system-account', [SystemAdminController::class, 'changeSystemAccount'])->name('systemAdmin.changeSystemAccount')->middleware('can:act-as-support-admin');
            //---- システム管理者向けAPI -----<<

            //トップページ集計
            Route::get('/aggregation-summary', [ApiHomeController::class, 'aggregationSummary'])->name('home.aggregationSummary');

            //顧客情報
            Route::get('/customers', [CustomerController::class, 'fetchCustomers'])->name('customers.fetchCustomers');
            Route::get('/customers/download', [CustomerController::class, 'downloadCustomers'])->name('customers.download');
            Route::patch('/customers/memo', [CustomerController::class, 'updateMemo'])->name('customers.updateMemo');

            //運営からのお知らせ
            Route::get('/management-notices', [ManagementNoticeController::class, 'fetchManagementNotices'])->name('managementNotice.fetchManagementNotices');

            //問い合わせチャット
            Route::get('/chat/chatrooms', [ChatController::class, 'fetchChatrooms'])->name('chat.chatrooms')->middleware('can:act-as-contract');
            Route::get('/chat/chatrooms/{chatroom_id}/customer', [ChatController::class, 'fetchCustomer'])->name('chat.customer')->middleware('can:act-as-contract');
            Route::patch('/chat/chatrooms/{chatroom_id}/status', [ChatController::class, 'changeStatus'])->name('chat.changeStatus')->middleware('can:act-as-contract');
            Route::post('/chat/chatrooms/{chatroom_id}/messages/process-send', [ChatController::class, 'processSend'])->name('chat.processSend')->middleware('can:act-as-contract');
            Route::post('/chat/chatrooms/{chatroom_id}/messages/process-delete', [ChatController::class, 'processDelete'])->name('chat.processDelete')->middleware('can:act-as-contract');
            Route::post('/chat/chatrooms/{chatroom_id}/messages/signed-urls', [ChatController::class, 'fetchSignedUrls'])->name('chat.signedUrls')->middleware('can:act-as-contract');
            Route::patch('/chat/chatrooms/{chatroom_id}/messages/mark-read', [ChatController::class, 'markRead'])->name('chat.markRead')->middleware('can:act-as-contract');
            Route::post('/chat/chatrooms/{chatroom_id}/media', [ChatController::class, 'uploadMedia'])->name('chat.uploadMedia')->middleware('can:act-as-contract');

            Route::post('/logout', [ApiAuthController::class, 'logout'])->name('logout');
        });

        Route::get('/{path?}', [HomeController::class, 'index'])->where('path', '.*')->name('root');
    });
});
