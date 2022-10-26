import React, { useEffect, useRef, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import SelectTo from "@/Components/SelectTo";
import Button from "@/Components/Button";
import Toastr from "@/Components/Toastr";
import Validate from "@/Components/Validate";
import { event } from "jquery";

import Swal from "sweetalert2";

export default function Model({
    header,
    modelData,
    subject,
    Api,
    setValidate,
    setValidate2,
    csrf_token,
}) {
    const [processing, setprocessing] = useState(false);
    const [dataUsers, setdataUsers] = useState([]);
    const [dataStore, setdataStore] = useState([]);

    const handleAsync = async (tipe, data) => {
        if (tipe === "update") {
            var data = new FormData($("#modelForm")[0]);
            data.append("id", modelData?.data.id);
            try {
                await axios({
                    method: "POST",
                    url: Api + "/update",
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.response === "success") {
                            $("#close").trigger("click");
                            Toastr(res.data.response, res.data.message);
                            $("#DataTables").DataTable().ajax.reload();
                            $("#modelForm")[0].reset();
                            $(".is-valid").removeClass("is-valid");

                            setTimeout(() => {
                                setprocessing(false);
                            }, 5000);
                        } else {
                            Toastr(res.data.response, res.data.message);
                            setTimeout(() => {
                                setprocessing(false);
                            }, 5000);
                        }
                    } else {
                        Toastr(res.data.response, res.data.message);
                        setTimeout(() => {
                            setprocessing(false);
                        }, 5000);
                    }
                });
            } catch (error) {
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
                Toastr("error", error.message);
            }
        } else if (tipe === "delete") {
            try {
                await axios({
                    method: "POST",
                    url: Api + "/delete",
                    data: {
                        id: modelData?.data.id,
                        file: "'" + data + "'",
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    $("#close").trigger("click");
                    Toastr(res.data.response, res.data.message);
                    $("#DataTables").DataTable().ajax.reload();
                    setTimeout(() => {
                        setprocessing(false);
                    }, 5000);
                });
            } catch (error) {
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
                Toastr("error", error.message);
            }
        } else if (tipe === "view") {
            try {
                await axios({
                    method: "POST",
                    url: "api/divisi/all",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    handleDataStore(res);
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        } else if (tipe === "uniquegroups") {
            try {
                await axios({
                    method: "POST",
                    url: "api/users/view",
                    data: {
                        uniquegroups: true,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }).then((res) => {
                    handleDataUsers(res);
                });
            } catch (error) {
                Toastr("error", error.message);
                setTimeout(() => {
                    setprocessing(false);
                }, 5000);
            }
        }
    };

    useEffect(() => {
        $("#close").click(function () {
            for (
                let i = 0;
                i < $(`input[name='${setValidate2}[]']`).length;
                i++
            ) {
                setTimeout(() => {
                    $(".react-select__multi-value__remove").trigger("click");
                }, 1);
            }
        });

        if (subject === "Groups") {
            handleAsync("uniquegroups");
            if (modelData) {
                modelData?.data.permission.map((val, i) => {
                    $(`#${val}Update`).prop("checked", true);
                });
            }
        }
    }, [modelData]);

    const handleDataUsers = (res) => {
        let resData = [];
        res.data?.data.map((val, i) => {
            resData.push({
                value: val.id,
                label: val.username,
            });
        });
        setdataUsers(resData);
    };

    const handleDataStore = (res) => {
        let resData = [];
        res.data?.data.map((val, i) => {
            resData.push({
                value: val.id,
                label: val.name,
            });
        });
        setdataStore(resData);
    };

    const submit = (e) => {
        setprocessing(true);
        e.preventDefault();
        if (header === "Update") {
            if (Validate("#modelForm", setValidate, setValidate2)) {
                handleAsync("update");
            } else {
                setprocessing(false);
            }
        } else if (header === "Delete") {
            handleAsync("delete");
        }
    };

    const dataActive = [
        { value: "1", label: "Active" },
        { value: "0", label: "Non Active" },
    ];

    const setPermission = [
        {
            subject: "Accounts",
            data: ["users", "divisi", "groups"],
        },
        {
            subject: "Report",
            data: ["report"],
        },
    ];

    const [selected, setSelected] = useState();

    const handleChangesetSelected = (event) => {
        setSelected(event.target.value);
    };

    const deleteHendel = (val) => {
        console.log(val);
        Swal.fire({
            title: "Yakin ingin menghapus file?",
            text: "File akan terhapus dari system!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                handleAsync("delete", val);
            }
        });
    };

    return (
        <div
            id="modal"
            className="modal fade bd-modal-lg"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
            data-bs-keyboard="false"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <b>{header + " " + subject}</b>
                        </h5>
                        <button
                            type="button"
                            id="close"
                            className="btn-close color-red"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <form id="modelForm" onSubmit={submit}>
                        {header === "Update" ? (
                            <div className="modal-body">
                                {subject === "Divisi" ? (
                                    <div>
                                        <center>
                                            <img
                                                src={modelData?.data.img}
                                                width="100px"
                                            />
                                        </center>
                                        <br />

                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="name"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="nameUpdate"
                                                        id="nameUpdate"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        defaultValue={
                                                            modelData?.data.name
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Status
                                                    </label>
                                                    <SelectTo
                                                        name="statusUpdate"
                                                        id="statusUpdate"
                                                        data={dataActive}
                                                        defaultValue={
                                                            modelData?.data
                                                                .active
                                                                ? "1"
                                                                : "0"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Logo
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
                                    </div>
                                ) : subject === "Users" ? (
                                    <div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="name"
                                                    >
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="usernameUpdate"
                                                        id="usernameUpdate"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        defaultValue={
                                                            modelData?.data
                                                                .username
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="emailUpdate"
                                                        id="emailUpdate"
                                                        className="form-control"
                                                        placeholder="abc123@gmail.com"
                                                        defaultValue={
                                                            modelData?.data
                                                                .email
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-12">
                                                <div className="form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="password"
                                                    >
                                                        Password Old
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="passwordUpdate"
                                                        id="passwordUpdate"
                                                        className="form-control"
                                                        placeholder="*********"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Password New
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="passwordUpdateNew"
                                                        id="passwordUpdateNew"
                                                        className="form-control"
                                                        placeholder="**********"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Confirm Password New
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="passwordUpdateNew_confirmation"
                                                        id="passwordUpdateNew_confirmation"
                                                        className="form-control"
                                                        placeholder="**********"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : subject === "Groups" ? (
                                    <div>
                                        <div className="mb-6 col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="nama">
                                                    Name Group
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nameUpdate"
                                                    name="nameUpdate"
                                                    placeholder="Name Group"
                                                    defaultValue={
                                                        modelData?.data.name
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6 col-md-12">
                                            <div className="form-group">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                <b>
                                                                    Permission
                                                                </b>
                                                            </th>
                                                            <th scope="col">
                                                                <center>
                                                                    <span className="badge badge-primary">
                                                                        <i className="fa fa-eye"></i>
                                                                    </span>
                                                                </center>
                                                            </th>
                                                            <th scope="col">
                                                                <center>
                                                                    <span className="badge badge-success">
                                                                        <i className="fa fa-plus"></i>
                                                                    </span>
                                                                </center>
                                                            </th>
                                                            <th scope="col">
                                                                <center>
                                                                    <span className="badge badge-warning">
                                                                        <i className="fa fa-pencil"></i>
                                                                    </span>
                                                                </center>
                                                            </th>
                                                            <th scope="col">
                                                                <center>
                                                                    <span className="badge badge-danger">
                                                                        <i className="fa fa-trash"></i>
                                                                    </span>
                                                                </center>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    {setPermission.map(
                                                        (val, i) => {
                                                            return (
                                                                <tbody key={i}>
                                                                    <tr>
                                                                        <td>
                                                                            <b>
                                                                                {
                                                                                    val.subject
                                                                                }
                                                                            </b>
                                                                        </td>
                                                                    </tr>

                                                                    {val.data.map(
                                                                        (
                                                                            val1,
                                                                            ii
                                                                        ) => {
                                                                            return (
                                                                                <tr
                                                                                    key={
                                                                                        ii
                                                                                    }
                                                                                >
                                                                                    <td
                                                                                        style={{
                                                                                            textTransform:
                                                                                                "capitalize",
                                                                                            paddingLeft:
                                                                                                "20px",
                                                                                        }}
                                                                                    >
                                                                                        {`${
                                                                                            ii +
                                                                                            1
                                                                                        }) ${val1} `}
                                                                                    </td>
                                                                                    <td>
                                                                                        <center>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                name="permissionUpdate[]"
                                                                                                value={`view${val1}`}
                                                                                                className="minimal"
                                                                                                id={`view${val1}Update`}
                                                                                            />
                                                                                        </center>
                                                                                    </td>
                                                                                    <td>
                                                                                        <center>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                name="permissionUpdate[]"
                                                                                                value={`create${val1}`}
                                                                                                className="minimal"
                                                                                                id={`create${val1}Update`}
                                                                                            />
                                                                                        </center>
                                                                                    </td>
                                                                                    <td>
                                                                                        <center>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                name="permissionUpdate[]"
                                                                                                value={`update${val1}`}
                                                                                                className="minimal"
                                                                                                id={`update${val1}Update`}
                                                                                            />
                                                                                        </center>
                                                                                    </td>
                                                                                    <td>
                                                                                        <center>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                name="permissionUpdate[]"
                                                                                                value={`delete${val1}`}
                                                                                                className="minimal"
                                                                                                id={`delete${val1}Update`}
                                                                                            />
                                                                                        </center>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        }
                                                                    )}
                                                                </tbody>
                                                            );
                                                        }
                                                    )}
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mb-6 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">
                                                    Target Users : (
                                                    {modelData?.data.users.map(
                                                        (val, i) => {
                                                            return ` ${val.label}, `;
                                                        }
                                                    )}
                                                    )
                                                </label>
                                                <SelectTo
                                                    id="targetUpdate"
                                                    name="targetUpdate[]"
                                                    data={dataUsers}
                                                    multi={true}
                                                    defaultValue={
                                                        modelData?.data.users
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : subject === "Report" ? (
                                    <div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        No Report
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="noUpdate"
                                                        id="noUpdate"
                                                        className="form-control"
                                                        placeholder="No Report"
                                                        defaultValue={
                                                            modelData?.data.id
                                                        }
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
                                                        name="dateUpdate"
                                                        defaultValue={
                                                            modelData?.data.tgl
                                                        }
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
                                                        name="pelaporUpdate"
                                                        id="pelaporUpdate"
                                                        className="form-control"
                                                        placeholder="Pelapor"
                                                        defaultValue={
                                                            modelData?.data
                                                                .pelapor
                                                        }
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
                                                        name="kejadianUpdate"
                                                        id="kejadianUpdate"
                                                        style={{
                                                            paddingTop: "10px",
                                                            height: "100px",
                                                        }}
                                                        className="form-control"
                                                        placeholder="Kejadian"
                                                        defaultValue={
                                                            modelData?.data
                                                                .kejadian
                                                        }
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
                                                        name="pidanaUpdate"
                                                        id="pidanaUpdate"
                                                        className="form-control"
                                                        placeholder="Pidana"
                                                        defaultValue={
                                                            modelData?.data
                                                                .pidana
                                                        }
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
                                                        name="terlaporUpdate"
                                                        id="terlaporUpdate"
                                                        className="form-control"
                                                        placeholder="Terlapor"
                                                        defaultValue={
                                                            modelData?.data
                                                                .terlapor
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Tindak Lanjut
                                                    </label>
                                                    <textarea
                                                        type="text"
                                                        name="tindak_lanjut"
                                                        id="tindak_lanjut"
                                                        style={{
                                                            paddingTop: "10px",
                                                            height: "100px",
                                                        }}
                                                        className="form-control"
                                                        placeholder="Tidak Lanjut"
                                                        defaultValue={
                                                            modelData?.data
                                                                .tindak_lanjut
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Progress
                                                    </label>
                                                    <br />
                                                    <ul className="tab">
                                                        <li>
                                                            <input
                                                                id="tab1"
                                                                type="radio"
                                                                name="progress"
                                                                value="Proses"
                                                                checked={
                                                                    selected
                                                                        ? selected ===
                                                                          "Proses"
                                                                        : modelData
                                                                              ?.data
                                                                              .progres ===
                                                                          "Proses"
                                                                }
                                                                onChange={
                                                                    handleChangesetSelected
                                                                }
                                                            />
                                                            <label htmlFor="tab1">
                                                                Proses
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                id="tab2"
                                                                type="radio"
                                                                name="progress"
                                                                value="Dihentikan"
                                                                checked={
                                                                    selected
                                                                        ? selected ===
                                                                          "Dihentikan"
                                                                        : modelData
                                                                              ?.data
                                                                              .progres ===
                                                                          "Dihentikan"
                                                                }
                                                                onChange={
                                                                    handleChangesetSelected
                                                                }
                                                            />
                                                            <label htmlFor="tab2">
                                                                Dihentikan
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                id="tab3"
                                                                type="radio"
                                                                name="progress"
                                                                value="Berhenti Sementara"
                                                                checked={
                                                                    selected
                                                                        ? selected ===
                                                                          "Berhenti Sementara"
                                                                        : modelData
                                                                              ?.data
                                                                              .progres ===
                                                                          "Berhenti Sementara"
                                                                }
                                                                onChange={
                                                                    handleChangesetSelected
                                                                }
                                                            />
                                                            <label htmlFor="tab3">
                                                                Berhenti
                                                                Sementara
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <input
                                                                id="tab4"
                                                                type="radio"
                                                                name="progress"
                                                                value="Selesai"
                                                                checked={
                                                                    selected
                                                                        ? selected ===
                                                                          "Selesai"
                                                                        : modelData
                                                                              ?.data
                                                                              .progres ===
                                                                          "Selesai"
                                                                }
                                                                onChange={
                                                                    handleChangesetSelected
                                                                }
                                                            />
                                                            <label htmlFor="tab4">
                                                                Selesai
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Ubah Berkas Lainnya
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
                                        <br />
                                        <div className="flex justify-center ">
                                            {modelData?.data?.file
                                                ? JSON.parse(
                                                      modelData?.data?.file
                                                  ).map((val, i) => {
                                                      if (
                                                          val.split(".")[1] !=
                                                          "pdf"
                                                      ) {
                                                          return (
                                                              <center
                                                                  key={i}
                                                                  className="m-2"
                                                              >
                                                                  <a
                                                                      href={`${val}`}
                                                                      target="_blank"
                                                                  >
                                                                      <img
                                                                          src={
                                                                              val
                                                                          }
                                                                          width="120px"
                                                                      />
                                                                  </a>
                                                                  <a
                                                                      className="badge badge-danger mt-1"
                                                                      value={i}
                                                                      onClick={() =>
                                                                          deleteHendel(
                                                                              i
                                                                          )
                                                                      }
                                                                  >
                                                                      Delete
                                                                  </a>
                                                              </center>
                                                          );
                                                      } else {
                                                          return (
                                                              <center key={i}>
                                                                  <a
                                                                      href={`${val}`}
                                                                      target="_blank"
                                                                  >
                                                                      <div
                                                                          className="m-2 align-middle border-2 border-black"
                                                                          style={{
                                                                              padding:
                                                                                  "30px",
                                                                          }}
                                                                      >
                                                                          PDF
                                                                      </div>
                                                                  </a>
                                                                  <a
                                                                      className="badge badge-danger"
                                                                      value={i}
                                                                      onClick={() =>
                                                                          deleteHendel(
                                                                              i
                                                                          )
                                                                      }
                                                                  >
                                                                      Delete
                                                                  </a>
                                                              </center>
                                                          );
                                                      }
                                                  })
                                                : ""}
                                        </div>
                                        <hr />
                                    </div>
                                ) : (
                                    "Gagal Mengambil Data"
                                )}
                            </div>
                        ) : header === "Delete" ? (
                            <div className="modal-body">
                                <div>Yakin Ingin Menghapus</div>
                            </div>
                        ) : header === "View" ? (
                            <div className="modal-body">
                                <div>View</div>
                            </div>
                        ) : (
                            <div className="modal-body color-danger">
                                Gagal Mengambil Data
                            </div>
                        )}
                        <div className="modal-footer">
                            <Button
                                type="submit"
                                className={
                                    header == "Delete"
                                        ? "btn btn-danger btn-block"
                                        : "btn btn-primary btn-block"
                                }
                                processing={processing}
                            >
                                {header == "Delete" ? "Delete" : "Save"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
