@extends('errors::layout')

@section('title', __('Forbidden'))
@section('code', '403')
@section('message')
    <h1>403</h1>
    <p>このページへのアクセス権限がありません。</p>
    <a href="{{route('admin.root')}}" class="back-home">ホームに戻る</a>
@endsection
