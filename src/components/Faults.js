import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';

export const Faults = () => {
  const [report, setReport] = useState([]);
  const [detail, setDetail] = useState("");
  const [data, setData] = useState([]);
  var count = 0;

  useEffect(() => {
    fetch('http://42.60.27.95:3000/incidentreport/J24')
      .then((res) => res.json())
      .then((result) => {console.log(result); setReport(result);}, (err) => console.log(err))
  }, [])

  return (
    <section className="faults" id="faults">
    <Container><Row className="align-items-center" id='openFaults'>
      <h2>All Open Faults</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th> Carpark </th>
              <th> Faults </th>
              <th> Status </th>
              <th> Scheduled Maintenance </th>
              <th> Reported By </th>
              <th> Rewards </th>
            </tr>
          </thead>
          <tbody>
            {report.map((row, i) => (
              <tr key={row.id}>
                <td>{++count}</td>
                <td>{'J24'}</td>
                <td>{row.report}</td>
                <td><div className={row.status === 'in-progress' ? "statusBarRed" : "statusBarGreen"}>{row.status === 'in-progress' ? "Pending" : "Done"}</div></td>
                <td>{row.timestamp}</td>
                <td>{row.user}</td>
                <td>{'10💎'}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </Row></Container>
    </section>
  );
}
