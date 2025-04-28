import { IMAGE_MAX_SIZE, VIDEO_MAX_SIZE } from '@src/config';

export const isValidMedia = (file: File | undefined): file is File => {
    if (file === undefined) {
        alert('ファイルを選択してください');
        return false;
    }

    // 画像と動画のサイズ制限
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
        alert('画像または動画ファイルを選択してください');
        return false;
    }

    const maxSize = isImage ? IMAGE_MAX_SIZE : VIDEO_MAX_SIZE;

    if (file.size > maxSize) {
        alert(
            `ファイルサイズが大きすぎます。\n画像は最大10MB、動画は最大100MBまでアップロードできます。`
        );
        return false;
    }

    if (isVideo) {
        const isAllow = _isValidVideoFormat(file);
        if (!isAllow) {
            return false;
        }
    }

    return true;
};

// mp4, mov, webm, mkv のみ許可
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
const _isValidVideoFormat = (file: File): boolean => {
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        alert('許可されていない動画形式です。mp4, mov, webm, mkv のみアップロード可能です。');
        return false;
    }

    return true;
};
