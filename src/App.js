import { useEffect } from "react";
import "./App.css";

import elestioLogo from "./elestio-logo.svg";

function getLatency() {
  var started = new Date().getTime();
  var url = "/data.json?t=" + +new Date();
  fetch(url)
    .then(function (response) {
      var ended = new Date().getTime();
      var milliseconds = ended - started;
      document.getElementById("latency").innerHTML = milliseconds + " ms";
    })
    .catch(function (error) {
      document.getElementById("latency").innerHTML = "? ms";
    });
}

function App() {
  useEffect(() => {
    (async function () {
      getLatency();
      if (localStorage.getItem("visitorInfos") == null) {
        var visitorInfos = null;
        await fetch("https://ipinfo.io/json")
          .then(async function (response) {
            visitorInfos = await response.json();
            localStorage.setItem("visitorInfos", JSON.stringify(visitorInfos));
          })
          .catch(function (error) {
            console.log(error);
            //document.getElementsByClassName("app-title")[0].innerHTML = "Backend is not reacheable, are you still connected to internet?";
          });
      } else {
        visitorInfos = JSON.parse(localStorage.getItem("visitorInfos"));
      }

      //console.log(visitorInfos);
      document.getElementById("yourIP").innerHTML = visitorInfos.ip
        ? visitorInfos.ip
        : "?";
      document.getElementById("location").innerHTML = visitorInfos.city
        ? visitorInfos.country + ", " + visitorInfos.city
        : "?";
    })();
  }, []);
  return (
    <>
      <header className="app-header">
        <img src={elestioLogo} alt="logo" />
      </header>
      <div className="app-body">
        <div className="app-heading" style={{ marginBottom: "40px" }}>
          <h1>Welcome to Elestio</h1>
          <h4>Deploy your apps quickly with the easiest CI/CD system</h4>
        </div>

        <p className="app-info-block">
          This Host{" "}
          <strong className="subVal" id="host">
            {window.location.host}
          </strong>
        </p>

        <p className="app-info-block">
          Your IP{" "}
          <strong className="subVal" id="yourIP">
            ?
          </strong>
        </p>

        <p className="app-info-block">
          Your Location{" "}
          <strong className="subVal" id="location">
            ?
          </strong>
        </p>

        <p className="app-info-block">
          Latency to server{" "}
          <strong className="subVal" id="latency">
            ? ms
          </strong>
        </p>

        <div className="app-deploy">
          <a href="https://dash.elest.io/" className="btn mb-10-m btn-try">
            Deploy on Elestio
          </a>
        </div>

        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
