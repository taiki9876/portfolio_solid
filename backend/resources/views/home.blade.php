@extends('layouts.base')

@section('content')
    <form method="post" action="{{ route('admin.logout') }}">
        @csrf
        <button type="submit">ログアウト</button>
    </form>
@endsection

@push('scripts')
@endpush
