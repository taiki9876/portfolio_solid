#!/bin/sh
set -e

# @see compose.yml - minio

# MinIO をバックグラウンドで起動
/usr/bin/minio server /export --address :9000 --console-address :9001 &
MINIO_PID=$!

# バケット作成やポリシー反映のためにサーバーの起動を待機
MAX_RETRIES=10
SLEEP_INTERVAL=2
echo "Waiting for minio to start..."
for i in $(seq 1 $MAX_RETRIES); do
  if [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/minio/health/ready)" -eq 200 ]; then
    echo "MinIO started successfully."
    break
  fi
  echo "Attempt $i/$MAX_RETRIES"
  sleep $SLEEP_INTERVAL
done

if [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/minio/health/ready)" -ne 200 ]; then
  echo "Error: Failed to start MinIO"
  exit 1
fi

# 環境変数のチェック
if [ -z "${AWS_BUCKET_PUBLIC}" ] || [ -z "${AWS_BUCKET_PRIVATE}" ]; then
  echo "Error: AWS_BUCKET_PUBLIC or AWS_BUCKET_PRIVATE is not set"
  exit 1
fi

# MinIO クライアントのエイリアス設定
if ! mc alias set myminio http://localhost:9000 "${MINIO_ROOT_USER}" "${MINIO_ROOT_PASSWORD}"; then
  echo "Error: Failed to set MinIO alias"
  exit 1
fi

# バケット作成
mc mb --ignore-existing myminio/${AWS_BUCKET_PUBLIC}
mc mb --ignore-existing myminio/${AWS_BUCKET_PRIVATE}

# バケットのポリシーを設定
mc anonymous set public myminio/${AWS_BUCKET_PUBLIC}
mc anonymous set none myminio/${AWS_BUCKET_PRIVATE}

# MinIO のプロセスを監視
wait $MINIO_PID
