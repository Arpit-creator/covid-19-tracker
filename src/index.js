import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "@/App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

window.addEventListener("load", () => {
	if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
		navigator.serviceWorker.register("/sw.js");
	}
});
