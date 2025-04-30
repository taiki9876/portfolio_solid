@extends('layouts.base')
@section("head")
    <style>
        body {
            font-family: 'Helvetica Neue', sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .login-container {
            box-sizing: border-box;
            background-color: #fff;
            padding: 2rem 3rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .login-container h1 {
            margin-bottom: 1.5rem;
            font-size: 24px;
            color: #333;
        }

        .form-group {
            margin-bottom: 1.2rem;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        }

        button[type="submit"] {
            width: 100%;
            padding: 0.8rem;
            background-color: #0A6D8E;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button[type="submit"]:hover {
            background-color: #2779bd;
        }

        .error-message {
            background-color: #ffe5e5;
            color: #c00;
            border: 1px solid #f5c2c2;
            padding: 0.8rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            text-align: left;
        }

        .error-message ul {
            padding-left: 1.2rem;
            margin: 0;
        }

        .error-message li {
            list-style: disc;
        }
    </style>
@endsection

@section('content')
    <div class="login-container">
        <h1>ログイン</h1>
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


