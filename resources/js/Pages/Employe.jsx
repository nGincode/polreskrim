import React, { useState, useRef, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Helmet } from "react-helmet";

import Skeleton from "@/Components/Skeleton";
import urlOpen from "@/Components/urlOpen";
import DataTables from "@/Components/DataTables";
import SelectTo from "@/Components/SelectTo";
import Button from "@/Components/Button";
import Toastr from "@/Components/Toastr";
import Validate from "@/Components/Validate";

export default function Employe(props) {
    const namePage = "Employe";
    const [processing, setprocessing] = useState(false);
    const [dataEmploye, setdataEmploye] = useState([]);
    const [dataStore, setdataStore] = useState([]);

    urlOpen("Auth");

    const handleAsync = async (tipe) => {
        if (tipe === "view") {
            try {
                await axios({
                    method: "POST",
                    url: "/api/employe/view",
                    data: {
                        users_id: props.auth.user.id,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": props.csrf_token,
                    },
                }).then((res) => {
                    handleDataEmploye(res);
                });

                await axios({
                    method: "POST",
                    url: "/api/store/all",
                    data: {
                        users_id: props.auth.user.id,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": props.csrf_token,
                    },
                }).then((res) => {
                    handleDataStore(res);
                });
            } catch (error) {
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
                Toastr("error", error.message);
            }
        } else if (tipe === "create") {
            var data = new FormData($("#createForm")[0]);
            try {
                await axios({
                    method: "POST",
                    url: "/api/employe/create",
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
        } else if (tipe === "update") {
            var data = new FormData($("#createForm")[0]);
            data.append("id", dataEmploye?.id);
            data.append("active", dataEmploye?.active);
            data.append("date_of_entry", dataEmploye?.date_of_entry);
            try {
                await axios({
                    method: "POST",
                    url: "/api/employe/update",
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
                        if (!dataEmploye?.id) {
                            $("#createForm")[0].reset();
                            $(".is-valid").removeClass("is-valid");
                        }
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
        handleAsync("view");
    }, []);

    const handleDataEmploye = (res) => {
        if (res.data.data) {
            $("#date_of_entry").prop("disabled", true);
            $("#active").prop("disabled", true);
            setdataEmploye(res.data.data);
        }
    };

    const handleDataStore = (res) => {
        if (res.data.data) {
            var dataStores = [];
            res.data.data.map((val, i) => {
                dataStores.push({ value: val.id, label: val.name });
            });
            setdataStore(dataStores);
        }
    };

    const selectReligion = [
        { value: "Islam", label: "Islam" },
        { value: "Kristen", label: "Kristen" },
        { value: "Katholik", label: "Katholik" },
    ];

    const selectGender = [
        { value: 2, label: "Female" },
        { value: 1, label: "Male" },
    ];

    const selectDivision = [
        { value: "Owner", label: "Owner" },
        { value: "Accounting", label: "Accounting" },
        { value: "Enginering", label: "Enginering" },
        {
            value: "Human Resource Development",
            label: "Human Resource Development",
        },
        { value: "Logistics", label: "Logistics" },
        { value: "Production Kitchen", label: "Production Kitchen" },
        { value: "Chief Leader", label: "Chief Leader" },
        { value: "Cashier", label: "Cashier" },
        { value: "Bartender", label: "Bartender" },
        { value: "Kitchen", label: "Kitchen" },
        { value: "Service Crew", label: "Service Crew" },
        { value: "Music", label: "Music" },
        { value: "Parking", label: "Parking" },
        ,
    ];

    const selectPosition = [
        { value: "Owner", label: "Owner" },
        { value: "Supervisor", label: "Supervisor" },
        { value: "Manager", label: "Manager" },
        { value: "Leader", label: "Leader" },
        { value: "Staf", label: "Staf" },
        { value: "Freelance", label: "Freelance" },
    ];

    const selectStatus = [
        { value: "0", label: "Active" },
        { value: "1", label: "Resign" },
    ];

    const setValidate = {
        name: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        date_of_birth: {
            required: true,
        },
        birth_of_place: {
            required: true,
        },
        date_of_entry: {
            required: true,
        },
        religion: {
            required: true,
        },
        gender: {
            required: true,
        },
        address: {
            required: true,
            minlength: 3,
            maxlength: 191,
        },
        status: {
            required: true,
        },
        whatsapp: {
            required: true,
            minlength: 12,
            maxlength: 15,
        },
        position: {
            required: true,
        },
        division: {
            required: true,
        },
        active: {
            required: true,
        },
    };

    const setValidateUpdate = {
        nameUpdate: {
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        date_of_birthUpdate: {
            required: true,
        },
        birth_of_placeUpdate: {
            required: true,
        },
        date_of_entryUpdate: {
            required: true,
        },
        religionUpdate: {
            required: true,
        },
        genderUpdate: {
            required: true,
        },
        addressUpdate: {
            required: true,
            minlength: 3,
            maxlength: 191,
        },
        statusUpdate: {
            required: true,
        },
        whatsappUpdate: {
            required: true,
            minlength: 12,
            maxlength: 15,
        },
        positionUpdate: {
            required: true,
        },
        divisionUpdate: {
            required: true,
        },
        activeUpdate: {
            required: true,
        },
    };

    const setValidateUpdate2 = ["storeUpdate"];

    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();

        if (Validate("#createForm", setValidate, ["store"])) {
            if (dataEmploye?.id) {
                handleAsync("update");
            } else {
                handleAsync("create");
            }
        } else {
            setprocessing(false);
        }
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
                        <Link href={route("employe")}>{namePage}</Link>
                    </li>
                </div>
            </div>
            <Skeleton type="2" />

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
                                    {dataEmploye?.img ? (
                                        <center>
                                            <img
                                                src={dataEmploye?.img}
                                                width="100px"
                                            />
                                            <br />
                                        </center>
                                    ) : (
                                        ""
                                    )}
                                    <form id="createForm" onSubmit={submit}>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Full Name (KTP)
                                                    </label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Adi Saxxx"
                                                        defaultValue={
                                                            dataEmploye.name
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="date_of_birth"
                                                        className="form-control"
                                                        defaultValue={
                                                            dataEmploye.date_of_birth
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Birth of Place
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="birth_of_place"
                                                        className="form-control"
                                                        placeholder="Bengkxx"
                                                        defaultValue={
                                                            dataEmploye.birth_of_place
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Date of Entry
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="date_of_entry"
                                                        name="date_of_entry"
                                                        className="form-control"
                                                        defaultValue={
                                                            dataEmploye.date_of_entry
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Religion
                                                    </label>
                                                    <SelectTo
                                                        name="religion"
                                                        id="religion"
                                                        data={selectReligion}
                                                        defaultValue={
                                                            dataEmploye.religion
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Gender
                                                    </label>
                                                    <SelectTo
                                                        name="gender"
                                                        id="gender"
                                                        data={selectGender}
                                                        defaultValue={
                                                            dataEmploye.gender
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Address
                                                    </label>
                                                    <input
                                                        name="address"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Jl. Jend Besar xxx"
                                                        defaultValue={
                                                            dataEmploye.address
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Whatsapp
                                                    </label>
                                                    <input
                                                        name="whatsapp"
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="0853xxxx"
                                                        defaultValue={
                                                            dataEmploye.whatsapp
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Position
                                                    </label>
                                                    <SelectTo
                                                        name="position"
                                                        id="position"
                                                        data={selectPosition}
                                                        defaultValue={
                                                            dataEmploye.position
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Division
                                                    </label>
                                                    <SelectTo
                                                        name="division"
                                                        id="division"
                                                        data={selectDivision}
                                                        defaultValue={
                                                            dataEmploye.division
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Store
                                                    </label>
                                                    <SelectTo
                                                        name="store"
                                                        id="store"
                                                        data={dataStore}
                                                        search={true}
                                                        defaultValue={
                                                            dataEmploye.store_id
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            Status
                                                        </label>
                                                        <SelectTo
                                                            name="active"
                                                            id="active"
                                                            data={selectStatus}
                                                            defaultValue={
                                                                dataEmploye.active ==
                                                                undefined
                                                                    ? ""
                                                                    : `${dataEmploye.active}`
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Foto
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="img"
                                                        accept="image/*"
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
                                                data: "img",
                                                title: "#",
                                            },
                                            {
                                                data: "name",
                                                title: "Name",
                                            },
                                            {
                                                data: "position",
                                                title: "Position",
                                            },
                                            {
                                                data: "whatsapp",
                                                title: "Whatsapp",
                                            },
                                            {
                                                data: "entry",
                                                title: "Date Of Entry",
                                            },
                                            {
                                                data: "action",
                                                title: "Action",
                                                orderable: false,
                                                width: 50,
                                                className: "text-right",
                                            },
                                        ]}
                                        API="/api/employe"
                                        Method="POST"
                                        Subject="Employe"
                                        setValidate={setValidateUpdate}
                                        setValidate2={setValidateUpdate2}
                                        csrf_token={props.csrf_token}
                                        Action={dataAction()}
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
