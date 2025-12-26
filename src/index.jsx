/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("wrapper");

render(() => <App />, root);
