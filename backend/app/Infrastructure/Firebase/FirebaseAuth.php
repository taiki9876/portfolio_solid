<?php

declare(strict_types=1);

namespace App\Infrastructure\Firebase;

use App\Models\Admin\Admin;
use App\Models\Contract\Contract;
use App\Models\Customer\Customer;
use App\Util\Env;
use Kreait\Firebase\Auth\UserRecord;
use Kreait\Firebase\Contract\Auth;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;

class FirebaseAuth
{
    public function __construct(
        private readonly Auth $auth
    ) {
    }

    /**
     * @param  Contract          $contract
     * @param  Admin|Customer    $user
     * @return UserRecord
     * @throws AuthException
     * @throws FirebaseException
     */
    public function createAuthUser(Contract $contract, Admin|Customer $user): UserRecord
    {
        if ($user->id === null) {
            throw new \DomainException("Adminアカウントを保存してください");
        }

        $userRecord = $this->auth->createUser([
            "uid" => $user->firebase_auth_uid,
        ]);

        $claims = [
            "contractKey" => $contract->key,
        ];
        $this->auth->setCustomUserClaims($userRecord->uid, $claims);

        return $userRecord;
    }

    /**
     * Firebaseログイン用のカスタムトークンを作成
     * @param  string            $firebaseAuthUid
     * @return string
     * @throws AuthException
     * @throws FirebaseException
     */
    public function createFirebaseLoginToken(string $firebaseAuthUid): string
    {
        return $this->auth->createCustomToken($firebaseAuthUid)->toString();
    }

    /**
     * @return array{deleted_users: string[], errors: array{uid: string, error: string}[]}
     */
    public static function deleteAllUsers(): array
    {
        if (Env::isProduction()) {
            throw new \RuntimeException("本番環境では実行できません");
        }
        $auth = resolve(Auth::class);

        $deletedUsers = [];
        $errors = [];

        try {
            // Firebase Auth ユーザーのページネーション取得
            $page = $auth->listUsers();

            foreach ($page as $user) {
                try {
                    $auth->deleteUser($user->uid);
                    $deletedUsers[] = $user->uid;
                } catch (FirebaseException|AuthException $e) {
                    $errors[] = [
                        'uid' => $user->uid,
                        'error' => $e->getMessage(),
                    ];
                }
            }
        } catch (\Exception $e) {
            throw new \RuntimeException("Firebaseユーザー取得失敗: " . $e->getMessage());
        }

        return [
            'deleted_users' => $deletedUsers,
            'errors' => $errors,
        ];
    }
}
