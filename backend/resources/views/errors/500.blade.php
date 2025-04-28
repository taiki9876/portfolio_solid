@extends('errors::layout')

@section('title', __('Server Error'))
@section('code', '500')
@section('message')
    <h1>500</h1>
    <p>申し訳ございません。システムに問題が発生しました。</p>
    <p>しばらくしてからもう一度お試しください。</p>
@endsection
