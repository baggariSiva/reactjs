import { useEffect, useState } from "react";

import "./App.css";
import elestioLogo from "./elestio-logo.svg";

const App = () => {
  const [latency, setLatency] = useState("? ms");
  const [location, setLocation] = useState("?");
  const [ip, setIP] = useState("?");

  useEffect(() => {
    (async function () {
      const interval = setInterval(() => getLatency(), 1000);

      if (localStorage.getItem("visitorInfos") == null) {
        var visitorInfos = null;
        await fetch("https://ipinfo.io/json")
          .then(async function (response) {
            visitorInfos = await response.json();
            localStorage.setItem("visitorInfos", JSON.stringify(visitorInfos));
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        visitorInfos = JSON.parse(localStorage.getItem("visitorInfos"));
      }

      setIP(visitorInfos.ip ? visitorInfos.ip : "?");

      setLocation(
        visitorInfos.city
          ? visitorInfos.country + ", " + visitorInfos.city
          : "?"
      );
    })();
  }, []);

  /**
   * Get Latency
   */
  const getLatency = () => {
    var started = new Date().getTime();
    var url = "/data.json?t=" + +new Date();
    fetch(url)
      .then(() => {
        var ended = new Date().getTime();
        var milliseconds = ended - started;
        setLatency(milliseconds + " ms");
      })
      .catch(() => setLatency("? ms"));
  };

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
            {ip}
          </strong>
        </p>

        <p className="app-info-block">
          Your Location{" "}
          <strong className="subVal" id="location">
            {location}
          </strong>
        </p>

        <p className="app-info-block">
          Latency to server{" "}
          <strong className="subVal" id="latency">
            {latency}
          </strong>
        </p>

        <div className="app-deploy">
          <a
            href="https://dash.elest.io/deploy?source=cicd&social=Github&url=https://github.com/elestio-examples/reactjs"
            className="btn mb-10-m btn-try"
            target={"_blank"}
          >
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
};

export default App;
