<?php

declare(strict_types=1);

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Util\Env;
use Exception;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    /**
     * @return string|Response
     *
     * @throws Exception
     */
    public function index(): string|Response
    {
        if (Env::isTesting()) {
            return "testing...";
        }

        $content = file_get_contents(public_path('/client/html/client.html'));
        if ($content === false) {
            return $this->abortHandle();
        }

        return $content;
    }

    private function abortHandle(): Response
    {
        if (Env::isLocal()) {
            throw new Exception("file not found... public/client/html/client.html：アプリ用 frontendのbuildをお願いします。");
        }

        Log::critical("[ERROR]: 管理画面フロントエンドのビルドファイルが見つかりませんでした。");
        abort(Response::HTTP_NOT_FOUND);
    }
}
