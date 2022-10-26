import React, { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Helmet } from "react-helmet";

import Skeleton from "@/Components/Skeleton";
import urlOpen from "@/Components/urlOpen";
import DataTables from "@/Components/DataTables";
import SelectTo from "@/Components/SelectTo";
import Toastr from "@/Components/Toastr";
import Button from "@/Components/Button";
import Validate from "@/Components/Validate";

export default function Report(props) {
    const namePage = "Report";
    const [processing, setprocessing] = useState(false);

    urlOpen("Auth");

    const handleAsync = async (tipe) => {
        if (tipe === "create") {
            var data = new FormData($("#createForm")[0]);
            data.append("id", props.auth.user.id);
            try {
                await axios({
                    method: "POST",
                    url: "/api/report/create",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": props.csrf_token,
                    },
                }).then((res) => {
                    setTimeout(() => {
                        setprocessing(false);
                    }, 5000);
                    Toastr(res.data.response, res.data.message);
                    if (res.data.response === "success") {
                        $("#DataTables").DataTable().ajax.reload();
                        $("#createForm")[0].reset();
                        $(".is-valid").removeClass("is-valid");
                    }
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        }
    };

    const permission = (tipe) => {
        if (tipe === "view") {
            if (props.permission.includes(`view${namePage.toLowerCase()}`)) {
                return true;
            } else {
                return false;
            }
        } else if (tipe === "update") {
            if (props.permission.includes(`update${namePage.toLowerCase()}`)) {
                return true;
            } else {
                return false;
            }
        } else if (tipe === "delete") {
            if (props.permission.includes(`delete${namePage.toLowerCase()}`)) {
                return true;
            } else {
                return false;
            }
        } else if (tipe === "create") {
            if (props.permission.includes(`create${namePage.toLowerCase()}`)) {
                return true;
            } else {
                return false;
            }
        }
    };

    const dataAction = () => {
        var actionData = [];
        if (permission("update")) {
            actionData.push("Update");
        }

        if (permission("delete")) {
            actionData.push("Delete");
        }
        return actionData;
    };

    if (!permission("view")) {
        Toastr("error", "You don't have permission");
        setTimeout(() => {
            window.location.replace("/dashboard");
        }, 2000);
    }

    useEffect(() => {
        $("#main-wrapper").removeClass("menu-toggle");
        $(".hamburger ").removeClass("is-active");
    }, []);

    const dataActive = [
        { value: "1", label: "Active" },
        { value: "0", label: "Non Active" },
    ];

    const setValidate = {
        no: {
            required: true,
            maxlength: 150,
        },
        pelapor: {
            required: true,
            maxlength: 150,
        },
        kejadian: {
            required: true,
        },
        pidana: {
            required: true,
            maxlength: 150,
        },
        terlapor: {
            required: true,
            maxlength: 150,
        },
        date: {
            required: true,
        },
    };

    const setValidateUpdate = {
        noUpdate: {
            required: true,
            maxlength: 150,
        },
        pelaporUpdate: {
            required: true,
            maxlength: 150,
        },
        kejadianUpdate: {
            required: true,
        },
        pidanaUpdate: {
            required: true,
            maxlength: 150,
        },
        terlaporUpdate: {
            required: true,
            maxlength: 150,
        },
        dateUpdate: {
            required: true,
        },
        tindak_lanjut: {
            required: true,
        },
    };

    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();
        if (Validate("#createForm", setValidate)) {
            handleAsync("create");
        } else {
            setprocessing(false);
        }
    };

    const dateTimeNow = () => {
        var months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        var myDays = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jum&#39;at",
            "Sabtu",
        ];

        var date = new Date();

        var day = date.getDate();

        var month = date.getMonth();

        var thisDay = date.getDay(),
            thisDay = myDays[thisDay];

        var yy = date.getYear();

        var year = yy < 1000 ? yy + 1900 : yy;
        return thisDay + ", " + day + " " + months[month] + " " + year;
    };

    return (
        <>
            <Head title={namePage} />
            <div className="row page-titles">
                <div className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a>Accounts</a>
                    </li>
                    <li className="breadcrumb-item  active">
                        <Link href={route("report")}>{namePage}</Link>
                    </li>
                </div>
            </div>
            <Skeleton />

            <div id="content">
                {permission("create") && (
                    <div className="col-xl-12 ">
                        <div className="card">
                            <div className="card-header coin-card">
                                <h4 className="card-title text-white">
                                    <b>{namePage}</b>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <form id="createForm" onSubmit={submit}>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="name"
                                                    >
                                                        No Report
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="no"
                                                        id="no"
                                                        className="form-control"
                                                        placeholder="No Report"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Waktu di laporkan
                                                    </label>
                                                    <input
                                                        type="datetime-local"
                                                        name="date"
                                                        id="date"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Pelapor
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="pelapor"
                                                        id="pelapor"
                                                        className="form-control"
                                                        placeholder="Pelapor"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Kejadian yang dilaporkan
                                                    </label>
                                                    <textarea
                                                        type="text"
                                                        name="kejadian"
                                                        id="kejadian"
                                                        style={{
                                                            paddingTop: "10px",
                                                            height: "100px",
                                                        }}
                                                        className="form-control"
                                                        placeholder="Kejadian"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Tindak Pidana
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="pidana"
                                                        id="pidana"
                                                        className="form-control"
                                                        placeholder="Pidana"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Terlapor
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="terlapor"
                                                        id="terlapor"
                                                        className="form-control"
                                                        placeholder="Terlapor"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Berkas Lainnya
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="file"
                                                        accept="image/jpeg,image/jpeg,image/gif,image/png,application/pdf"
                                                        className="form-file-input form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <Button
                                            type="submit"
                                            className="btn btn-primary"
                                            processing={processing}
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {permission("view") && (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header bg-secondary">
                                <h4 className="card-title  text-white">
                                    <b>Data {namePage}</b>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <DataTables
                                        columns={[
                                            {
                                                data: "tgl",
                                                title: "Tanggal",
                                            },
                                            {
                                                data: "pelapor",
                                                title: "Pelapor",
                                            },
                                            {
                                                data: "pidana",
                                                title: "Pidana",
                                            },
                                            {
                                                data: "status",
                                                title: "Progress",
                                            },
                                            {
                                                data: "action",
                                                title: "Action",
                                                orderable: false,
                                                width: 50,
                                                className: "text-right",
                                            },
                                        ]}
                                        API="/api/report"
                                        Method="POST"
                                        Subject="Report"
                                        Action={dataAction()}
                                        setValidate={setValidateUpdate}
                                        csrf_token={props.csrf_token}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
