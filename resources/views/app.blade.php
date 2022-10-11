<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="F&B" />
    <meta property="og:title" content="Prima Rasa Selaras" />
    <meta property="og:description" content="Prima Rasa Selaras" />
    <meta property="og:image" content="https://dompet.dexignlab.com/xhtml/social-image.png" />
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" href="/assets/logo/prs.png" />

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
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            background: #5bcfc5;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #5bcfc5;
        }

        a {
            cursor: pointer;
        }

        svg {
            display: unset;
        }

        .mm-active {
            transition: 0.3s;
        }

        .form-control {
            border-color: darkgrey;
        }

        [type='text']:focus,
        [type='email']:focus,
        [type='url']:focus,
        [type='password']:focus,
        [type='number']:focus,
        [type='date']:focus,
        [type='datetime-local']:focus,
        [type='month']:focus,
        [type='search']:focus,
        [type='tel']:focus,
        [type='time']:focus,
        [type='week']:focus,
        [multiple]:focus,
        textarea:focus,
        select:focus {
            box-shadow: none;
        }

        .css-1pahdxg-control {
            box-shadow: none;
            border-color: #5bcfc5;
            border-radius: 1rem;
            height: 56px;
            padding-left: 10px;
            cursor: pointer;
        }

        .css-1pahdxg-control:hover {
            box-shadow: none;
            border-color: #5bcfc5;
        }

        .css-1pahdxg-control:active {
            box-shadow: none;
            border-color: #5bcfc5;
        }

        .css-1s2u09g-control {
            height: 56px;
            border-radius: 1rem;
            padding-left: 10px;

        }

        .css-qc6sy-singleValue {
            color: hsl(210deg 3% 47%);
        }


        .css-1s2u09g-control {
            cursor: pointer;
            border-radius: 1rem;
            padding-left: 5px;
            margin-top: -5px;
            margin-left: -20px;
            margin-right: -17px;
            background: transparent;
            border: unset;
        }

        .css-1pahdxg-control {
            box-shadow: none;
            border-color: #5bcfc5;
            border-radius: 1rem;
            padding-left: 5px;
            margin-top: -5px;
            margin-left: -20px;
            margin-right: -17px;
            background: transparent;
            border: unset;
        }

        #react-select-2-listbox {
            margin-left: -20px;
        }

        .invalid-feedback-select {
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #f72b50;
        }

        #DataTables_paginate {
            margin-top: 10px;
        }

        @media only screen and (max-width: 1400px) {
            .css-1s2u09g-control {
                cursor: pointer;
                height: 30px;
                border-radius: 1rem;
                padding-left: 5px;
                margin-top: -5px;
                margin-left: -20px;
                margin-right: -17px;
                background: transparent;
                border: unset;
            }

            .css-1pahdxg-control {
                box-shadow: none;
                height: 30px;
                border-color: #5bcfc5;
                border-radius: 1rem;
                padding-left: 5px;
                margin-top: -5px;
                margin-left: -20px;
                margin-right: -17px;
                background: transparent;
                border: unset;
            }

            .css-1pahdxg-control:hover {
                box-shadow: none;
                border-color: #5bcfc5;
            }

            .css-1pahdxg-control:active {
                box-shadow: none;
                border-color: #5bcfc5;
            }

        }

        .select:hover,
        .select:active {
            border-color: #5bcfc5;
        }

        [type='checkbox']:checked:hover,
        [type='checkbox']:checked:focus,
        [type='checkbox']:checked:active,
        [type='radio']:checked:hover,
        [type='radio']:checked:active,
        [type='radio']:checked:focus {
            background-color: #5bcfc5;
        }

        .metismenu>li {
            margin: 3px 0px;
        }

        select {
            min-width: 60px;
        }

        .css-1okebmr-indicatorSeparator {
            background-color: unset;
        }

        table.dataTable tr.selected {
            color: unset;
        }

        .form-control[type="file"]:not(:disabled):not([readonly]) {
            border: unset;
            padding: 10px;
        }

        .form-control.is-invalid {
            border: #f72b50 1px solid !important;
        }

        .form-control.is-valid {
            border: #68e365 1px solid !important;
        }

        .m-active {
            color: var(--primary);
            font-weight: 400;
            box-shadow: none;
            background: var(--rgba-primary-1);
        }

        .table> :not(:last-child)> :last-child>* {
            border-bottom-color: whitesmoke
        }
    </style>

</body>

</html>