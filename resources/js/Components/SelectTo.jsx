import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

import Select from "react-select";
import SelectCreate from "react-select/creatable";
import AsyncCreatableSelect from "react-select/async-creatable";

export default function SelectTo({
    search,
    create,
    multi,
    id,
    name,
    data,
    defaultValue,
    className,
}) {
    if (defaultValue) {
        var dataSelect = [...defaultValue].concat(data);
    } else {
        var dataSelect = data;
    }

    const handleChange = (val) => {
        if (val.__isNew__) {
            setoptions((options) => [
                ...options,
                { value: val.value, label: val.label },
            ]);
            console.log("oke");
        }
    };

    return (
        <>
            {search && create ? (
                <SelectCreate
                    name={name}
                    placeholder="Choose..."
                    onChange={(val) => {
                        handleChange(val);
                    }}
                    options={dataSelect}
                    createOptionPosition="first"
                    className="form-control"
                    classNamePrefix="react-select"
                    id={id}
                />
            ) : search ? (
                <Select
                    options={dataSelect}
                    name={name}
                    defaultValue={defaultValue ?? ""}
                    className="form-control"
                    classNamePrefix="react-select"
                    id={id}
                />
            ) : multi ? (
                <Select
                    isMulti
                    name={name}
                    options={dataSelect}
                    id={id}
                    className="form-control"
                    classNamePrefix="react-select"
                    defaultValue={defaultValue ?? ""}
                />
            ) : (
                <select
                    name={name}
                    id={id}
                    defaultValue={defaultValue ?? ""}
                    className={`form-control ` + (className ?? "")}
                >
                    <option value="" disabled>
                        Choose...
                    </option>
                    {data.map((val) => {
                        return (
                            <option key={val.value} value={val.value}>
                                {val.label}
                            </option>
                        );
                    })}
                </select>
            )}
        </>
    );
}
