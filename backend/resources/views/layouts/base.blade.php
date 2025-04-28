<!DOCTYPE HTML>
<html lang="ja">
<head>
    <meta charset="utf-8">
    @hasSection('pageTitle')
        <title>{{ config('app.display_name') }}｜@yield('pageTitle')</title>
    @else
        <title>{{ config('app.display_name') }}</title>
    @endif
    @yield('head')
</head>
<body >
@include('components.header-nav')

@yield('content')

@include('components.footer')

@stack('scripts')
</body>
</html>
