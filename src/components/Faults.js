import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import 'animate.css';

export const Faults = () => {
  const [report, setReport] = useState([]);
  const [votes, setVotes] = useState(new Array(100).fill(0));
  const [vote,setVote] = useState(0);
  var count = 0;

  useEffect(() => {
    fetch('http://42.60.179.123:3000/incidentreport/J24')
      .then((res) => res.json())
      .then((result) => {console.log(result); setReport(result);}, (err) => console.log(err))
  }, [])
  const increaseVote = (index) =>{
    votes[index]++;
    return votes;
  }

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
              <th> Verify </th>
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
                <td><div class="voteRoundRect">
                <div class="incrementUp" onClick={(e) => {console.log(votes[i]);votes[i] = votes[i]+1;setVotes(votes);setVote(votes[i]);}}></div> 
                <div class="incrementDown" onClick={(e) => {console.log(votes[i]);votes[i] = votes[i]-1;setVotes(votes);setVote(votes[i]);}}></div>
                <div class="count">{votes[i]}</div>
              </div></td>
              </tr>
            ))}
          </tbody>
        </table>
    </Row></Container>
    </section>
  );
}
/**
 <div class="incrementUp" onClick={(e) => {votes.splice(count-1,1,votes[count-1]+1);setVotes(votes);setVote(votes[count-1]);}}></div> 
                <div class="incrementDown" onClick={(e) => {votes.splice(count-1,1,votes[count-1]-1);setVotes(votes);setVote(votes[count-1]);}}></div>
                <div class="count">{vote}</div>
  
 */