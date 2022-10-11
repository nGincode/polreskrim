import "../css/app.css";
import _ from "lodash";
import axios from "axios";

window._ = _;

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import Authenticated from "@/Layouts/Authenticated";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        localStorage.setItem("urlOpen", props.initialPage.url);
        console.log("URL Open : " + localStorage.getItem("urlOpen"));

        if (
            props.initialPage.url === "/" ||
            props.initialPage.url === "/login" ||
            props.initialPage.url === "/register" ||
            props.initialPage.url === "/forgot-password" ||
            props.initialPage.url === "/verify-email"
        ) {
            return render(<App {...props} />, el);
        } else {
            return render(
                <Authenticated auth={props.initialPage.props.auth}>
                    <App {...props} per="id" />
                </Authenticated>,
                el
            );
        }
    },
});

InertiaProgress.init({ color: "#4B5563" });
