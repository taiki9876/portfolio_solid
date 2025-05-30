<?php

declare(strict_types=1);

return [
    'accepted' => ':attribute を承認する必要があります。',
    'accepted_if' => ':other が :value の場合、:attribute を承認する必要があります。',
    'active_url' => ':attribute は有効なURLではありません。',
    'after' => ':attribute は :date より後の日付でなければなりません。',
    'after_or_equal' => ':attribute は :date 以降の日付でなければなりません。',
    'alpha' => ':attribute はアルファベットのみを含むことができます。',
    'alpha_dash' => ':attribute はアルファベット、数字、ダッシュ、アンダースコアのみを含むことができます。',
    'alpha_num' => ':attribute はアルファベットと数字のみを含むことができます。',
    'array' => ':attribute は配列でなければなりません。',
    'ascii' => ':attribute には半角の英数字と記号のみを含む必要があります。',
    'before' => ':attribute は :date より前の日付でなければなりません。',
    'before_or_equal' => ':attribute は :date 以前の日付でなければなりません。',
    'between' => [
        'array' => ':attribute の項目数は :min から :max の間でなければなりません。',
        'file' => ':attribute のファイルサイズは :min ～ :max キロバイトでなければなりません。',
        'numeric' => ':attribute は :min から :max の間でなければなりません。',
        'string' => ':attribute の文字数は :min ～ :max 文字でなければなりません。',
    ],
    'boolean' => ':attribute は true または false でなければなりません。',
    'can' => ':attribute には許可されていない値が含まれています。',
    'confirmed' => ':attribute の確認が一致しません。',
    'contains' => ':attribute に必要な値が含まれていません。',
    'current_password' => 'パスワードが正しくありません。',
    'date' => ':attribute は有効な日付ではありません。',
    'date_equals' => ':attribute は :date と同じ日付でなければなりません。',
    'date_format' => ':attribute は :format 形式と一致しません。',
    'decimal' => ':attribute は :decimal 桁の小数でなければなりません。',
    'declined' => ':attribute は辞退する必要があります。',
    'declined_if' => ':other が :value の場合、:attribute は辞退する必要があります。',
    'different' => ':attribute と :other は異なる必要があります。',
    'digits' => ':attribute は :digits 桁でなければなりません。',
    'digits_between' => ':attribute は :min ～ :max 桁でなければなりません。',
    'dimensions' => ':attribute の画像サイズが無効です。',
    'distinct' => ':attribute に重複した値があります。',
    'doesnt_end_with' => ':attribute は次のいずれかで終了してはいけません: :values。',
    'doesnt_start_with' => ':attribute は次のいずれかで開始してはいけません: :values。',
    'email' => ':attribute は有効なメールアドレスでなければなりません。',
    'ends_with' => ':attribute は次のいずれかで終了する必要があります: :values。',
    'enum' => '選択された :attribute は無効です。',
    'exists' => '選択された :attribute は無効です。',
    'extensions' => ':attribute は次の拡張子のいずれかでなければなりません: :values。',
    'file' => ':attribute はファイルでなければなりません。',
    'filled' => ':attribute には値が必要です。',
    'gt' => [
        'array' => ':attribute の項目数は :value を超える必要があります。',
        'file' => ':attribute のファイルサイズは :value キロバイトを超える必要があります。',
        'numeric' => ':attribute は :value を超える必要があります。',
        'string' => ':attribute の文字数は :value を超える必要があります。',
    ],
    'gte' => [
        'array' => ':attribute の項目数は :value 以上でなければなりません。',
        'file' => ':attribute のファイルサイズは :value キロバイト以上でなければなりません。',
        'numeric' => ':attribute は :value 以上でなければなりません。',
        'string' => ':attribute の文字数は :value 以上でなければなりません。',
    ],
    'hex_color' => ':attribute は有効な16進カラーコードでなければなりません。',
    'image' => ':attribute は画像でなければなりません。',
    'in' => '選択された :attribute は無効です。',
    'in_array' => ':attribute は :other に存在する必要があります。',
    'integer' => ':attribute は整数でなければなりません。',
    'ip' => ':attribute は有効なIPアドレスでなければなりません。',
    'ipv4' => ':attribute は有効なIPv4アドレスでなければなりません。',
    'ipv6' => ':attribute は有効なIPv6アドレスでなければなりません。',
    'json' => ':attribute は有効なJSON文字列でなければなりません。',
    'list' => ':attribute はリストでなければなりません。',
    'lowercase' => ':attribute は小文字でなければなりません。',
    'lt' => [
        'array' => ':attribute の項目数は :value 未満でなければなりません。',
        'file' => ':attribute のファイルサイズは :value キロバイト未満でなければなりません。',
        'numeric' => ':attribute は :value 未満でなければなりません。',
        'string' => ':attribute の文字数は :value 未満でなければなりません。',
    ],
    'lte' => [
        'array' => ':attribute の項目数は :value 以下でなければなりません。',
        'file' => ':attribute のファイルサイズは :value キロバイト以下でなければなりません。',
        'numeric' => ':attribute は :value 以下でなければなりません。',
        'string' => ':attribute の文字数は :value 以下でなければなりません。',
    ],
    'mac_address' => ':attribute は有効なMACアドレスでなければなりません。',
    'max' => [
        'array' => ':attribute の項目数は :max を超えてはいけません。',
        'file' => ':attribute のファイルサイズは :max キロバイトを超えてはいけません。',
        'numeric' => ':attribute は :max を超えてはいけません。',
        'string' => ':attribute の文字数は :max を超えてはいけません。',
    ],
    'max_digits' => ':attribute は :max 桁以下でなければなりません。',
    'mimes' => ':attribute は次のタイプのファイルでなければなりません: :values。',
    'mimetypes' => ':attribute は次のタイプのファイルでなければなりません: :values。',
    'min' => [
        'array' => ':attribute の項目数は :min 以上でなければなりません。',
        'file' => ':attribute のファイルサイズは :min キロバイト以上でなければなりません。',
        'numeric' => ':attribute は :min 以上でなければなりません。',
        'string' => ':attribute の文字数は :min 以上でなければなりません。',
    ],
    'min_digits' => ':attribute は :min 桁以上でなければなりません。',
    'missing' => ':attribute は欠落している必要があります。',
    'not_regex' => ':attribute の形式が無効です。',
    'numeric' => ':attribute は数値でなければなりません。',
    'password' => [
        'letters' => ':attribute は少なくとも1文字のアルファベットを含む必要があります。',
        'mixed' => ':attribute は大文字と小文字をそれぞれ1つ以上含む必要があります。',
        'numbers' => ':attribute は少なくとも1つの数字を含む必要があります。',
        'symbols' => ':attribute は少なくとも1つの記号を含む必要があります。',
    ],
    'present' => ':attribute が存在する必要があります。',
    'required' => ':attribute は必須です。',
    'unique' => ':attribute はすでに使用されています。',
    'uploaded' => ':attribute のアップロードに失敗しました。',
    'uppercase' => ':attribute は大文字でなければなりません。',
    'url' => ':attribute は有効なURLでなければなりません。',
    'uuid' => ':attribute は有効なUUIDでなければなりません。',

    'attributes' => [
        'login_id' => 'ログインID',
        'password' => 'パスワード',
    ],
];
