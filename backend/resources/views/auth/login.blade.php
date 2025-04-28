@extends('layouts.base')

@section('content')
    <div class="login-container">
        <h1>Login</h1>
        @if ($errors->any())
            <div class="error-message">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="post" action="{{ route('admin.login') }}">
            @csrf
            <div class="form-group">
                <input type="text" id="username" name="login_id" placeholder="LOGIN ID">
            </div>
            <div class="form-group">
                <input type="password" id="password" name="password" placeholder="PASSWORD">
            </div>
            <div class="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
@endpush


