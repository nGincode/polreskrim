<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="RESKRIM" />
    <meta property="og:title" content="RESKRIM BENGKULU" />
    <meta property="og:description" content="RESKRIM" />
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" href="/assets/logo/logobareskrim.png" />

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body>
    @inertia


    <style>
        ul.tab {
            list-style-type: none;
            margin: 0;
            padding: 0;
            border-radius: 5px;
        }

        ul.tab li {
            float: left;
            padding: 0;
        }

        ul.tab li label {
            padding: 8px;
            display: inline-block;
            cursor: pointer;
        }

        ul.tab li input[type="radio"] {
            opacity: 0;
            width: 1px;
            height: 1px;
        }

        ul.tab li input[type="radio"]:checked~label {
            background: #5bcfc5;
            border-radius: 10px;
            color: white;
        }
    </style>
</body>

</html>