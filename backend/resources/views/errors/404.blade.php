@extends('errors::layout')

@section('title', __('Not Found'))
@section('code', '404')
@section('message')
    <h1>404</h1>
    <p>お探しのページは見つかりませんでした。</p>
    <a href="{{route('admin.root')}}" class="back-home">ホームに戻る</a>
@endsection
