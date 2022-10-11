import React, { useState, useRef, useEffect, Component } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Helmet } from "react-helmet";

import urlOpen from "@/Components/urlOpen";
import Skeleton from "@/Components/Skeleton";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ApexCharts from "react-apexcharts";
import { MdWavingHand } from "react-icons/md";

export default function Dashboard(props) {
    const namePage = "Dashboard";

    urlOpen("Auth");

    useEffect(() => {
        $("#main-wrapper").removeClass("menu-toggle");
        $(".hamburger ").removeClass("is-active");
    }, []);

    return (
        <>
            <Head title={namePage} />
            <Skeleton />

            <div id="content">
                <div className="row invoice-card-row">
                    <div className="col-xl-12">
                        <div className="card coin-card">
                            <div className="card-body d-sm-flex d-block align-items-center">
                                <span className="coin-icon">
                                    <MdWavingHand size={70} />
                                </span>
                                <div>
                                    <h3 className="text-white">
                                        Haii..!! {props.auth.user.username}
                                    </h3>
                                    {props.employe ? (
                                        <p>
                                            Selamat Datang {props.employe.name}
                                            <br /> Anda Bergabung Dalam Divisi{" "}
                                            {
                                                props.employe.division
                                            } Sebagai{" "}
                                            <b>{props.employe.position}</b>
                                        </p>
                                    ) : (
                                        <p>
                                            Anda telah berhasil login, Anda
                                            sedang divaliadasi oleh pihak admin
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6">
                        <div className="card bg-warning invoice-card">
                            <div className="card-body d-flex">
                                <div className="icon me-3">
                                    <svg width="33px" height="32px">
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(255, 255, 255)"
                                            d="M31.963,30.931 C31.818,31.160 31.609,31.342 31.363,31.455 C31.175,31.538 30.972,31.582 30.767,31.583 C30.429,31.583 30.102,31.463 29.845,31.243 L25.802,27.786 L21.758,31.243 C21.502,31.463 21.175,31.583 20.837,31.583 C20.498,31.583 20.172,31.463 19.915,31.243 L15.872,27.786 L11.829,31.243 C11.622,31.420 11.370,31.534 11.101,31.572 C10.832,31.609 10.558,31.569 10.311,31.455 C10.065,31.342 9.857,31.160 9.710,30.931 C9.565,30.703 9.488,30.437 9.488,30.167 L9.488,17.416 L2.395,17.416 C2.019,17.416 1.658,17.267 1.392,17.001 C1.126,16.736 0.976,16.375 0.976,16.000 L0.976,6.083 C0.976,4.580 1.574,3.139 2.639,2.076 C3.703,1.014 5.146,0.417 6.651,0.417 L26.511,0.417 C28.016,0.417 29.459,1.014 30.524,2.076 C31.588,3.139 32.186,4.580 32.186,6.083 L32.186,30.167 C32.186,30.437 32.109,30.703 31.963,30.931 ZM9.488,6.083 C9.488,5.332 9.189,4.611 8.657,4.080 C8.125,3.548 7.403,3.250 6.651,3.250 C5.898,3.250 5.177,3.548 4.645,4.080 C4.113,4.611 3.814,5.332 3.814,6.083 L3.814,14.583 L9.488,14.583 L9.488,6.083 ZM29.348,6.083 C29.348,5.332 29.050,4.611 28.517,4.080 C27.985,3.548 27.263,3.250 26.511,3.250 L11.559,3.250 C12.059,4.111 12.324,5.088 12.325,6.083 L12.325,27.092 L14.950,24.840 C15.207,24.620 15.534,24.500 15.872,24.500 C16.210,24.500 16.537,24.620 16.794,24.840 L20.837,28.296 L24.880,24.840 C25.137,24.620 25.463,24.500 25.802,24.500 C26.140,24.500 26.467,24.620 26.724,24.840 L29.348,27.092 L29.348,6.083 ZM25.092,20.250 L16.581,20.250 C16.205,20.250 15.844,20.101 15.578,19.835 C15.312,19.569 15.162,19.209 15.162,18.833 C15.162,18.457 15.312,18.097 15.578,17.831 C15.844,17.566 16.205,17.416 16.581,17.416 L25.092,17.416 C25.469,17.416 25.829,17.566 26.096,17.831 C26.362,18.097 26.511,18.457 26.511,18.833 C26.511,19.209 26.362,19.569 26.096,19.835 C25.829,20.101 25.469,20.250 25.092,20.250 ZM25.092,14.583 L16.581,14.583 C16.205,14.583 15.844,14.434 15.578,14.168 C15.312,13.903 15.162,13.542 15.162,13.167 C15.162,12.791 15.312,12.430 15.578,12.165 C15.844,11.899 16.205,11.750 16.581,11.750 L25.092,11.750 C25.469,11.750 25.829,11.899 26.096,12.165 C26.362,12.430 26.511,12.791 26.511,13.167 C26.511,13.542 26.362,13.903 26.096,14.168 C25.829,14.434 25.469,14.583 25.092,14.583 ZM25.092,8.916 L16.581,8.916 C16.205,8.916 15.844,8.767 15.578,8.501 C15.312,8.236 15.162,7.875 15.162,7.500 C15.162,7.124 15.312,6.764 15.578,6.498 C15.844,6.232 16.205,6.083 16.581,6.083 L25.092,6.083 C25.469,6.083 25.829,6.232 26.096,6.498 C26.362,6.764 26.511,7.124 26.511,7.500 C26.511,7.875 26.362,8.236 26.096,8.501 C25.829,8.767 25.469,8.916 25.092,8.916 Z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white invoice-num">
                                        2478
                                    </h2>
                                    <span className="text-white fs-18">
                                        Total Invoices
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6">
                        <div className="card bg-success invoice-card">
                            <div className="card-body d-flex">
                                <div className="icon me-3">
                                    <svg width="35px" height="34px">
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(255, 255, 255)"
                                            d="M32.482,9.730 C31.092,6.789 28.892,4.319 26.120,2.586 C22.265,0.183 17.698,-0.580 13.271,0.442 C8.843,1.458 5.074,4.140 2.668,7.990 C0.255,11.840 -0.509,16.394 0.514,20.822 C1.538,25.244 4.224,29.008 8.072,31.411 C10.785,33.104 13.896,34.000 17.080,34.000 L17.286,34.000 C20.456,33.960 23.541,33.044 26.213,31.358 C26.991,30.866 27.217,29.844 26.725,29.067 C26.234,28.291 25.210,28.065 24.432,28.556 C22.285,29.917 19.799,30.654 17.246,30.687 C14.627,30.720 12.067,29.997 9.834,28.609 C6.730,26.671 4.569,23.644 3.752,20.085 C2.934,16.527 3.546,12.863 5.486,9.763 C9.488,3.370 17.957,1.418 24.359,5.414 C26.592,6.808 28.360,8.793 29.477,11.157 C30.568,13.460 30.993,16.016 30.707,18.539 C30.607,19.448 31.259,20.271 32.177,20.371 C33.087,20.470 33.911,19.820 34.011,18.904 C34.363,15.764 33.832,12.591 32.482,9.730 L32.482,9.730 Z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(255, 255, 255)"
                                            d="M22.593,11.237 L14.575,19.244 L11.604,16.277 C10.952,15.626 9.902,15.626 9.250,16.277 C8.599,16.927 8.599,17.976 9.250,18.627 L13.399,22.770 C13.725,23.095 14.150,23.254 14.575,23.254 C15.001,23.254 15.427,23.095 15.753,22.770 L24.940,13.588 C25.592,12.937 25.592,11.888 24.940,11.237 C24.289,10.593 23.238,10.593 22.593,11.237 L22.593,11.237 Z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white invoice-num">
                                        983
                                    </h2>
                                    <span className="text-white fs-18">
                                        Paid Invoices
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6">
                        <div className="card bg-info invoice-card">
                            <div className="card-body d-flex">
                                <div className="icon me-3">
                                    <svg width="35px" height="34px">
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(255, 255, 255)"
                                            d="M33.002,9.728 C31.612,6.787 29.411,4.316 26.638,2.583 C22.781,0.179 18.219,-0.584 13.784,0.438 C9.356,1.454 5.585,4.137 3.178,7.989 C0.764,11.840 -0.000,16.396 1.023,20.825 C2.048,25.247 4.734,29.013 8.584,31.417 C11.297,33.110 14.409,34.006 17.594,34.006 L17.800,34.006 C20.973,33.967 24.058,33.050 26.731,31.363 C27.509,30.872 27.735,29.849 27.243,29.072 C26.751,28.296 25.727,28.070 24.949,28.561 C22.801,29.922 20.314,30.660 17.761,30.693 C15.141,30.726 12.581,30.002 10.346,28.614 C7.241,26.675 5.080,23.647 4.262,20.088 C3.444,16.515 4.056,12.850 5.997,9.748 C10.001,3.353 18.473,1.401 24.876,5.399 C27.110,6.793 28.879,8.779 29.996,11.143 C31.087,13.447 31.513,16.004 31.227,18.527 C31.126,19.437 31.778,20.260 32.696,20.360 C33.607,20.459 34.432,19.809 34.531,18.892 C34.884,15.765 34.352,12.591 33.002,9.728 L33.002,9.728 Z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(255, 255, 255)"
                                            d="M23.380,11.236 C22.728,10.585 21.678,10.585 21.026,11.236 L17.608,14.656 L14.190,11.243 C13.539,10.592 12.488,10.592 11.836,11.243 C11.184,11.893 11.184,12.942 11.836,13.593 L15.254,17.006 L11.836,20.420 C11.184,21.071 11.184,22.120 11.836,22.770 C12.162,23.096 12.588,23.255 13.014,23.255 C13.438,23.255 13.864,23.096 14.190,22.770 L17.608,19.357 L21.026,22.770 C21.352,23.096 21.777,23.255 22.203,23.255 C22.629,23.255 23.054,23.096 23.380,22.770 C24.031,22.120 24.031,21.071 23.380,20.420 L19.962,17.000 L23.380,13.587 C24.031,12.936 24.031,11.887 23.380,11.236 L23.380,11.236 Z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white invoice-num">
                                        1256
                                    </h2>
                                    <span className="text-white fs-18">
                                        Unpaid Invoices
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6">
                        <div className="card bg-secondary invoice-card">
                            <div className="card-body d-flex">
                                <div className="icon me-3">
                                    <svg width="33px" height="32px">
                                        <path
                                            fillRule="evenodd"
                                            fill="rgb(255, 255, 255)"
                                            d="M31.963,30.931 C31.818,31.160 31.609,31.342 31.363,31.455 C31.175,31.538 30.972,31.582 30.767,31.583 C30.429,31.583 30.102,31.463 29.845,31.243 L25.802,27.786 L21.758,31.243 C21.502,31.463 21.175,31.583 20.837,31.583 C20.498,31.583 20.172,31.463 19.915,31.243 L15.872,27.786 L11.829,31.243 C11.622,31.420 11.370,31.534 11.101,31.572 C10.832,31.609 10.558,31.569 10.311,31.455 C10.065,31.342 9.857,31.160 9.710,30.931 C9.565,30.703 9.488,30.437 9.488,30.167 L9.488,17.416 L2.395,17.416 C2.019,17.416 1.658,17.267 1.392,17.001 C1.126,16.736 0.976,16.375 0.976,16.000 L0.976,6.083 C0.976,4.580 1.574,3.139 2.639,2.076 C3.703,1.014 5.146,0.417 6.651,0.417 L26.511,0.417 C28.016,0.417 29.459,1.014 30.524,2.076 C31.588,3.139 32.186,4.580 32.186,6.083 L32.186,30.167 C32.186,30.437 32.109,30.703 31.963,30.931 ZM9.488,6.083 C9.488,5.332 9.189,4.611 8.657,4.080 C8.125,3.548 7.403,3.250 6.651,3.250 C5.898,3.250 5.177,3.548 4.645,4.080 C4.113,4.611 3.814,5.332 3.814,6.083 L3.814,14.583 L9.488,14.583 L9.488,6.083 ZM29.348,6.083 C29.348,5.332 29.050,4.611 28.517,4.080 C27.985,3.548 27.263,3.250 26.511,3.250 L11.559,3.250 C12.059,4.111 12.324,5.088 12.325,6.083 L12.325,27.092 L14.950,24.840 C15.207,24.620 15.534,24.500 15.872,24.500 C16.210,24.500 16.537,24.620 16.794,24.840 L20.837,28.296 L24.880,24.840 C25.137,24.620 25.463,24.500 25.802,24.500 C26.140,24.500 26.467,24.620 26.724,24.840 L29.348,27.092 L29.348,6.083 ZM25.092,20.250 L16.581,20.250 C16.205,20.250 15.844,20.101 15.578,19.835 C15.312,19.569 15.162,19.209 15.162,18.833 C15.162,18.457 15.312,18.097 15.578,17.831 C15.844,17.566 16.205,17.416 16.581,17.416 L25.092,17.416 C25.469,17.416 25.829,17.566 26.096,17.831 C26.362,18.097 26.511,18.457 26.511,18.833 C26.511,19.209 26.362,19.569 26.096,19.835 C25.829,20.101 25.469,20.250 25.092,20.250 ZM25.092,14.583 L16.581,14.583 C16.205,14.583 15.844,14.434 15.578,14.168 C15.312,13.903 15.162,13.542 15.162,13.167 C15.162,12.791 15.312,12.430 15.578,12.165 C15.844,11.899 16.205,11.750 16.581,11.750 L25.092,11.750 C25.469,11.750 25.829,11.899 26.096,12.165 C26.362,12.430 26.511,12.791 26.511,13.167 C26.511,13.542 26.362,13.903 26.096,14.168 C25.829,14.434 25.469,14.583 25.092,14.583 ZM25.092,8.916 L16.581,8.916 C16.205,8.916 15.844,8.767 15.578,8.501 C15.312,8.236 15.162,7.875 15.162,7.500 C15.162,7.124 15.312,6.764 15.578,6.498 C15.844,6.232 16.205,6.083 16.581,6.083 L25.092,6.083 C25.469,6.083 25.829,6.232 26.096,6.498 C26.362,6.764 26.511,7.124 26.511,7.500 C26.511,7.875 26.362,8.236 26.096,8.501 C25.829,8.767 25.469,8.916 25.092,8.916 Z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white invoice-num">
                                        652
                                    </h2>
                                    <span className="text-white fs-18">
                                        Total Invoices Sent
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12 col-xxl-12">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card progress-card">
                                <div className="card-body d-flex">
                                    <div className="me-auto">
                                        <h4 className="card-title">
                                            Total Transactions
                                        </h4>
                                        <div className="d-flex align-items-center">
                                            <h2 className="fs-38 mb-0">98k</h2>
                                            <div className="text-success transaction-caret">
                                                <i className="fa fa-sort-asc"></i>
                                                <p className="mb-0">+0.5%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="progress progress-vertical-bottom"
                                        style={{
                                            minHeight: "110px",
                                            minWidth: "10px",
                                        }}
                                    >
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{
                                                width: "10px",
                                                height: "40%",
                                            }}
                                            role="progressbar"
                                        >
                                            <span className="sr-only">
                                                40% Complete
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="progress progress-vertical-bottom"
                                        style={{
                                            minHeight: "110px",
                                            minWidth: "10px",
                                        }}
                                    >
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{
                                                width: "10px",
                                                height: "55%",
                                            }}
                                            role="progressbar"
                                        >
                                            <span className="sr-only">
                                                55% Complete
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="progress progress-vertical-bottom"
                                        style={{
                                            minHeight: "110px",
                                            minWidth: "10px",
                                        }}
                                    >
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{
                                                width: "10px",
                                                height: "80%",
                                            }}
                                            role="progressbar"
                                        >
                                            <span className="sr-only">
                                                80% Complete
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="progress progress-vertical-bottom"
                                        style={{
                                            minHeight: "110px",
                                            minWidth: "10px",
                                        }}
                                    >
                                        <div
                                            className="progress-bar bg-primary"
                                            style={{
                                                width: "10px",
                                                height: "50%",
                                            }}
                                            role="progressbar"
                                        >
                                            <span className="sr-only">
                                                50% Complete
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">
                                        Invoice Remaining
                                    </h4>
                                    <div className="d-flex align-items-center">
                                        <div className="me-auto">
                                            <div
                                                className="progress mt-4"
                                                style={{ height: "10px" }}
                                            >
                                                <div
                                                    className="progress-bar bg-primary progress-animated"
                                                    style={{
                                                        width: "45%",
                                                        height: "10px",
                                                    }}
                                                    role="progressbar"
                                                >
                                                    <span className="sr-only">
                                                        60% Complete
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="fs-16 mb-0 mt-2">
                                                <span className="text-danger">
                                                    -0,8%{" "}
                                                </span>
                                                from last month
                                            </p>
                                        </div>
                                        <h2 className="fs-38">854</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mt-2">
                                        Invoice Sent
                                    </h4>
                                    <div className="d-flex align-items-center mt-3 mb-2">
                                        <h2 className="fs-38 mb-0 me-3">456</h2>
                                        <span className="badge badge-success badge-xl">
                                            +0.5%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mt-2">
                                        Invoice Compeleted
                                    </h4>
                                    <div className="d-flex align-items-center mt-3 mb-2">
                                        <h2 className="fs-38 mb-0 me-3">
                                            1467
                                        </h2>
                                        <span className="badge badge-danger badge-xl">
                                            -6.4%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-xl-6">
                                        <div className="card-bx bg-blue">
                                            <img
                                                className="pattern-img"
                                                src="/tamplate/images/pattern/pattern6.png"
                                                alt=""
                                            />
                                            <div className="card-info text-white">
                                                <img
                                                    src="/tamplate/images/pattern/circle.png"
                                                    className="mb-4"
                                                    alt=""
                                                />
                                                <h2 className="text-white card-balance">
                                                    $824,571.93
                                                </h2>
                                                <p className="fs-16">
                                                    Wallet Balance
                                                </p>
                                                <span>
                                                    +0,8% than last week
                                                </span>
                                            </div>
                                            <a className="change-btn">
                                                <i className="fa fa-caret-up up-ico"></i>
                                                Change
                                                <span className="reload-icon">
                                                    <i className="fa fa-refresh reload active"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="row  mt-xl-0 mt-4">
                                            <div className="col-md-6">
                                                <h4 className="card-title">
                                                    Card's Overview
                                                </h4>
                                                <span>
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit
                                                    psu olor
                                                </span>
                                                <ul className="card-list mt-4">
                                                    <li>
                                                        <span className="bg-blue circle"></span>
                                                        Account<span>20%</span>
                                                    </li>
                                                    <li>
                                                        <span className="bg-success circle"></span>
                                                        Services<span>40%</span>
                                                    </li>
                                                    <li>
                                                        <span className="bg-warning circle"></span>
                                                        Restaurant
                                                        <span>15%</span>
                                                    </li>
                                                    <li>
                                                        <span className="bg-light circle"></span>
                                                        Others<span>15%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <Chart
                                                    type="polarArea"
                                                    data={{
                                                        labels: [
                                                            "Mon",
                                                            "Tue",
                                                            "Wed",
                                                            "Thu",
                                                        ],
                                                        datasets: [
                                                            {
                                                                backgroundColor:
                                                                    [
                                                                        "#496ecc",
                                                                        "#68e365",
                                                                        "#ffa755",
                                                                        "#c8c8c8",
                                                                    ],
                                                                data: [
                                                                    40, 35, 30,
                                                                    20,
                                                                ],
                                                            },
                                                        ],
                                                    }}
                                                    options={{
                                                        plugins: {
                                                            legend: {
                                                                display: false,
                                                            },
                                                            maintainAspectRatio: false,
                                                            scale: {
                                                                scaleShowLine: false,
                                                                display: false,
                                                                pointLabels: {
                                                                    fontSize: 0,
                                                                },
                                                            },
                                                            tooltips: {
                                                                enabled: false,
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-7">
                        <div className="card">
                            <div className="card-header pb-0 border-0">
                                <div>
                                    <h4 className="card-title mb-2">
                                        Activity
                                    </h4>
                                    <h2 className="mb-0">$78120</h2>
                                </div>
                                <ul className="card-list">
                                    <li className="justify-content-end">
                                        Income
                                        <span className="bg-success circle me-0 ms-2"></span>
                                    </li>
                                    <li className="justify-content-end">
                                        Outcome
                                        <span className="bg-danger circle me-0 ms-2"></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body pb-0 pt-3">
                                <ApexCharts
                                    series={[
                                        {
                                            name: "Income",
                                            data: [50, 18, 70, 40],
                                            radius: 12,
                                        },
                                        {
                                            name: "Outcome",
                                            data: [80, 40, 55, 20],
                                        },
                                    ]}
                                    type="bar"
                                    height="200"
                                    width="100%"
                                    options={{
                                        chart: {
                                            toolbar: {
                                                show: false,
                                            },
                                        },
                                        plotOptions: {
                                            bar: {
                                                horizontal: false,
                                                columnWidth: "57%",
                                                borderRadius: 12,
                                            },
                                        },
                                        states: {
                                            hover: {
                                                filter: "none",
                                            },
                                        },
                                        colors: ["#80ec67", "#fe7d65"],
                                        dataLabels: {
                                            enabled: false,
                                        },
                                        markers: {
                                            shape: "circle",
                                        },
                                        legend: {
                                            position: "top",
                                            horizontalAlign: "right",
                                            show: false,
                                            fontSize: "12px",
                                            labels: {
                                                colors: "#000000",
                                            },
                                            markers: {
                                                width: 18,
                                                height: 18,
                                                strokeWidth: 0,
                                                strokeColor: "#fff",
                                                fillColors: undefined,
                                                radius: 12,
                                            },
                                        },
                                        stroke: {
                                            show: true,
                                            width: 4,
                                            colors: ["transparent"],
                                        },
                                        grid: {
                                            borderColor: "#eee",
                                        },
                                        xaxis: {
                                            categories: [
                                                "Sun",
                                                "Mon",
                                                "Tue",
                                                "Wed",
                                            ],
                                            labels: {
                                                style: {
                                                    colors: "#3e4954",
                                                    fontSize: "13px",
                                                    fontFamily: "poppins",
                                                    fontWeight: 400,
                                                    cssClass:
                                                        "apexcharts-xaxis-label",
                                                },
                                            },
                                            crosshairs: {
                                                show: false,
                                            },
                                        },
                                        yaxis: {
                                            labels: {
                                                offsetX: -16,
                                                style: {
                                                    colors: "#3e4954",
                                                    fontSize: "13px",
                                                    fontFamily: "poppins",
                                                    fontWeight: 400,
                                                    cssClass:
                                                        "apexcharts-xaxis-label",
                                                },
                                            },
                                        },
                                        fill: {
                                            opacity: 1,
                                            colors: ["#80ec67", "#fe7d65"],
                                        },
                                        tooltip: {
                                            y: {
                                                formatter: function (val) {
                                                    return (
                                                        "$ " +
                                                        val +
                                                        " thousands"
                                                    );
                                                },
                                            },
                                        },
                                        responsive: [
                                            {
                                                breakpoint: 1600,
                                                options: {
                                                    chart: {
                                                        height: 400,
                                                    },
                                                },
                                            },
                                            {
                                                breakpoint: 575,
                                                options: {
                                                    chart: {
                                                        height: 250,
                                                    },
                                                },
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-5">
                        <div className="card">
                            <div className="card-header border-0 pb-0">
                                <div>
                                    <h4 className="card-title mb-2">
                                        Spendings
                                    </h4>
                                    <span className="fs-12">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                                <div className="dropdown">
                                    <a
                                        className="btn-link"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                                stroke="#575757"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                                stroke="#575757"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                                stroke="#575757"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item">Delete</a>
                                        <a className="dropdown-item">Edit</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="progress default-progress">
                                    <div
                                        className="progress-bar bg-gradient-1 progress-animated"
                                        style={{ width: "45%", height: "20px" }}
                                        role="progressbar"
                                    >
                                        <span className="sr-only">
                                            45% Complete
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
                                    <span>Investment</span>
                                    <span className="fs-18">
                                        <span className="text-black pe-2">
                                            $1415
                                        </span>
                                        /$2000
                                    </span>
                                </div>
                                <div className="progress default-progress mt-4">
                                    <div
                                        className="progress-bar bg-gradient-2 progress-animated"
                                        style={{ width: "70%", height: "20px" }}
                                        role="progressbar"
                                    >
                                        <span className="sr-only">
                                            70% Complete
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
                                    <span>Restaurant</span>
                                    <span className="fs-18">
                                        <span className="text-black pe-2">
                                            $1567
                                        </span>
                                        /$5000
                                    </span>
                                </div>
                                <div className="progress default-progress mt-4">
                                    <div
                                        className="progress-bar bg-gradient-3 progress-animated"
                                        style={{ width: "35%", height: "20px" }}
                                        role="progressbar"
                                    >
                                        <span className="sr-only">
                                            35% Complete
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
                                    <span>Installment</span>
                                    <span className="fs-18">
                                        <span className="text-black pe-2">
                                            $487
                                        </span>
                                        /$10000
                                    </span>
                                </div>
                                <div className="progress default-progress mt-4">
                                    <div
                                        className="progress-bar bg-gradient-4 progress-animated"
                                        style={{ width: "95%", height: "20px" }}
                                        role="progressbar"
                                    >
                                        <span className="sr-only">
                                            95% Complete
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end mt-2 justify-content-between">
                                    <span>Property</span>
                                    <span className="fs-18">
                                        <span className="text-black pe-2">
                                            $3890
                                        </span>
                                        /$4000
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer border-0 pt-0">
                                <a className="btn btn-outline-primary d-block btn-lg">
                                    View More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-xxl-12">
                        <div className="card">
                            <div className="card-header d-flex flex-wrap border-0 pb-0">
                                <div className="me-auto mb-sm-0 mb-3">
                                    <h4 className="card-title mb-2">
                                        Transaction Overview
                                    </h4>
                                    <span className="fs-12">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                                <a className="btn btn-rounded btn-md btn-primary mr-3 me-3">
                                    <i className="las la-download scale5 me-3"></i>
                                    Download Report
                                </a>
                                <div className="dropdown">
                                    <a
                                        className="btn-link"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                                stroke="#575757"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                                stroke="#575757"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                                stroke="#575757"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item">Delete</a>
                                        <a className="dropdown-item">Edit</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pb-2">
                                <div className="d-sm-flex d-block">
                                    <div className="form-check toggle-switch text-end form-switch me-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexSwitchCheckDefault"
                                        >
                                            Number
                                        </label>
                                    </div>
                                    <div className="form-check toggle-switch text-end form-switch me-auto">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault1"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexSwitchCheckDefault1"
                                        >
                                            Analytics
                                        </label>
                                    </div>
                                    <ul className="card-list d-flex mt-sm-0 mt-3">
                                        <li className="me-3">
                                            <span className="bg-success circle"></span>
                                            Income
                                        </li>
                                        <li>
                                            <span className="bg-danger circle"></span>
                                            Outcome
                                        </li>
                                    </ul>
                                </div>

                                <ApexCharts
                                    series={[
                                        {
                                            name: "Income",
                                            data: [50, 18, 70, 40, 90, 50],
                                            radius: 12,
                                        },
                                        {
                                            name: "Outcome",
                                            data: [80, 40, 55, 20, 50, 70],
                                        },
                                    ]}
                                    type="bar"
                                    height="400"
                                    width="100%"
                                    options={{
                                        chart: {
                                            toolbar: {
                                                show: false,
                                            },
                                        },
                                        plotOptions: {
                                            bar: {
                                                horizontal: false,
                                                columnWidth: "70%",
                                                borderRadius: 10,
                                            },
                                        },
                                        states: {
                                            hover: {
                                                filter: "none",
                                            },
                                        },
                                        colors: ["#80ec67", "#fe7d65"],
                                        dataLabels: {
                                            enabled: false,
                                        },
                                        markers: {
                                            shape: "circle",
                                        },

                                        legend: {
                                            position: "top",
                                            horizontalAlign: "right",
                                            show: false,
                                            fontSize: "12px",
                                            labels: {
                                                colors: "#000000",
                                            },
                                            markers: {
                                                width: 18,
                                                height: 18,
                                                strokeWidth: 0,
                                                strokeColor: "#fff",
                                                fillColors: undefined,
                                                radius: 12,
                                            },
                                        },
                                        stroke: {
                                            show: true,
                                            width: 5,
                                            colors: ["transparent"],
                                        },
                                        grid: {
                                            borderColor: "#eee",
                                        },
                                        xaxis: {
                                            categories: [
                                                "Sun",
                                                "Mon",
                                                "Tue",
                                                "Wed",
                                                "Thu",
                                                "Fri",
                                            ],
                                            labels: {
                                                style: {
                                                    colors: "#3e4954",
                                                    fontSize: "13px",
                                                    fontFamily: "poppins",
                                                    fontWeight: 400,
                                                    cssClass:
                                                        "apexcharts-xaxis-label",
                                                },
                                            },
                                            crosshairs: {
                                                show: false,
                                            },
                                        },
                                        yaxis: {
                                            labels: {
                                                offsetX: -16,
                                                style: {
                                                    colors: "#3e4954",
                                                    fontSize: "13px",
                                                    fontFamily: "poppins",
                                                    fontWeight: 400,
                                                    cssClass:
                                                        "apexcharts-xaxis-label",
                                                },
                                            },
                                        },
                                        fill: {
                                            opacity: 1,
                                            colors: ["#80ec67", "#fe7d65"],
                                        },
                                        tooltip: {
                                            y: {
                                                formatter: function (val) {
                                                    return (
                                                        "$ " +
                                                        val +
                                                        " thousands"
                                                    );
                                                },
                                            },
                                        },
                                        responsive: [
                                            {
                                                breakpoint: 575,
                                                options: {
                                                    chart: {
                                                        height: 250,
                                                    },
                                                },
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-xxl-12">
                        <div className="card">
                            <div className="card-header d-block d-sm-flex border-0">
                                <div className="me-3">
                                    <h4 className="card-title mb-2">
                                        Previous Transactions
                                    </h4>
                                    <span className="fs-12">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </span>
                                </div>
                                <div className="card-tabs mt-3 mt-sm-0">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                data-bs-toggle="tab"
                                                href="#monthly"
                                                role="tab"
                                            >
                                                Monthly
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                href="#Weekly"
                                                role="tab"
                                            >
                                                Weekly
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                href="#Today"
                                                role="tab"
                                            >
                                                Today
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body tab-content p-0">
                                <div
                                    className="tab-pane active show fade"
                                    id="monthly"
                                    role="tabpanel"
                                >
                                    <div className="table-responsive">
                                        <table className="table table-responsive-md card-table transactions-table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                XYZ Store ID
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Cashback
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 4, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-success fs-16 font-w500 text-end d-block">
                                                            Completed
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-danger tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Chef Renata
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 5, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            -$167
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-light fs-16 font-w500 text-end d-block">
                                                            Pending
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Cindy Alexandro
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 5, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger fs-16 font-w500 text-end d-block">
                                                            Canceled
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Paipal
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 4, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-success fs-16 font-w500 text-end d-block">
                                                            Completed
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-danger tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Hawkins Jr.
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Cashback
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 4, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger fs-16 font-w500 text-end d-block">
                                                            Canceled
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane"
                                    id="Weekly"
                                    role="tabpanel"
                                >
                                    <div className="table-responsive">
                                        <table className="table table-responsive-md card-table transactions-table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                XYZ Store ID
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Cashback
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 4, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-success fs-16 font-w500 text-end d-block">
                                                            Completed
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-danger tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Chef Renata
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 5, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            -$167
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-light fs-16 font-w500 text-end d-block">
                                                            Pending
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Cindy Alexandro
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 5, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger fs-16 font-w500 text-end d-block">
                                                            Canceled
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane"
                                    id="Today"
                                    role="tabpanel"
                                >
                                    <div className="table-responsive">
                                        <table className="table table-responsive-md card-table transactions-table">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-danger tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Chef Renata
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 5, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            -$167
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-light fs-16 font-w500 text-end d-block">
                                                            Pending
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Cindy Alexandro
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 5, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger fs-16 font-w500 text-end d-block">
                                                            Canceled
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-success tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 42.9875C34.8938 42.3094 35.1836 41.4891 35.8617 41.1609C37.7484 40.2531 39.3453 38.8422 40.4828 37.0758C41.6477 35.2656 42.2656 33.1656 42.2656 31C42.2656 24.7875 37.2125 19.7344 31 19.7344C24.7875 19.7344 19.7344 24.7875 19.7344 31C19.7344 33.1656 20.3523 35.2656 21.5117 37.0813C22.6437 38.8477 24.2461 40.2586 26.1328 41.1664C26.8109 41.4945 27.1008 42.3094 26.7727 42.993C26.4445 43.6711 25.6297 43.9609 24.9461 43.6328C22.6 42.5063 20.6148 40.7563 19.2094 38.5578C17.7656 36.3047 17 33.6906 17 31C17 27.2594 18.4547 23.743 21.1016 21.1016C23.743 18.4547 27.2594 17 31 17C34.7406 17 38.257 18.4547 40.8984 21.1016C43.5453 23.7484 45 27.2594 45 31C45 33.6906 44.2344 36.3047 42.7852 38.5578C41.3742 40.7508 39.3891 42.5063 37.0484 43.6328C36.3648 43.9555 35.55 43.6711 35.2219 42.9875Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 31.7274C36.5891 31.9953 36.7203 32.3453 36.7203 32.6953C36.7203 33.0453 36.5891 33.3953 36.3211 33.6633L32.8812 37.1031C32.3781 37.6063 31.7109 37.8797 31.0055 37.8797C30.3 37.8797 29.6273 37.6008 29.1297 37.1031L25.6898 33.6633C25.1539 33.1274 25.1539 32.2633 25.6898 31.7274C26.2258 31.1914 27.0898 31.1914 27.6258 31.7274L29.6437 33.7453L29.6437 25.9742C29.6437 25.2196 30.2562 24.6071 31.0109 24.6071C31.7656 24.6071 32.3781 25.2196 32.3781 25.9742L32.3781 33.7508L34.3961 31.7328C34.9211 31.1969 35.7852 31.1969 36.3211 31.7274Z"
                                                                    fill="#2BC155"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Paipal
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Transfer
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 4, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-success fs-16 font-w500 text-end d-block">
                                                            Completed
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <svg
                                                            className="bgl-danger tr-icon"
                                                            width="63"
                                                            height="63"
                                                            viewBox="0 0 63 63"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M35.2219 19.0125C34.8937 19.6906 35.1836 20.5109 35.8617 20.8391C37.7484 21.7469 39.3453 23.1578 40.4828 24.9242C41.6476 26.7344 42.2656 28.8344 42.2656 31C42.2656 37.2125 37.2125 42.2656 31 42.2656C24.7875 42.2656 19.7344 37.2125 19.7344 31C19.7344 28.8344 20.3523 26.7344 21.5117 24.9187C22.6437 23.1523 24.2461 21.7414 26.1328 20.8336C26.8109 20.5055 27.1008 19.6906 26.7726 19.007C26.4445 18.3289 25.6297 18.0391 24.9461 18.3672C22.6 19.4937 20.6148 21.2437 19.2094 23.4422C17.7656 25.6953 17 28.3094 17 31C17 34.7406 18.4547 38.257 21.1015 40.8984C23.743 43.5453 27.2594 45 31 45C34.7406 45 38.257 43.5453 40.8984 40.8984C43.5453 38.2516 45 34.7406 45 31C45 28.3094 44.2344 25.6953 42.7851 23.4422C41.3742 21.2492 39.389 19.4937 37.0484 18.3672C36.3648 18.0445 35.55 18.3289 35.2219 19.0125Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                                <path
                                                                    d="M36.3211 30.2726C36.589 30.0047 36.7203 29.6547 36.7203 29.3047C36.7203 28.9547 36.589 28.6047 36.3211 28.3367L32.8812 24.8969C32.3781 24.3937 31.7109 24.1203 31.0055 24.1203C30.3 24.1203 29.6273 24.3992 29.1297 24.8969L25.6898 28.3367C25.1539 28.8726 25.1539 29.7367 25.6898 30.2726C26.2258 30.8086 27.0898 30.8086 27.6258 30.2726L29.6437 28.2547L29.6437 36.0258C29.6437 36.7804 30.2562 37.3929 31.0109 37.3929C31.7656 37.3929 32.3781 36.7804 32.3781 36.0258L32.3781 28.2492L34.3961 30.2672C34.9211 30.8031 35.7851 30.8031 36.3211 30.2726Z"
                                                                    fill="#FF2E2E"
                                                                ></path>
                                                            </g>
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 font-w600 mb-0">
                                                            <a className="text-black">
                                                                Hawkins Jr.
                                                            </a>
                                                        </h6>
                                                        <span className="fs-14">
                                                            Cashback
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <h6 className="fs-16 text-black font-w600 mb-0">
                                                            June 4, 2020
                                                        </h6>
                                                        <span className="fs-14">
                                                            05:34:45 AM
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-16 text-black font-w600">
                                                            +$5,553
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger fs-16 font-w500 text-end d-block">
                                                            Canceled
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
