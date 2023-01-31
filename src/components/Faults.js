import React, { useState,useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import axios from 'axios';


export const Faults = () => {
  const [report, setReport] = useState([]);
  const [votes, setVotes] = useState(new Array(100).fill(0));
  const [vote,setVote] = useState(0);
  const [rerender, setRerender] = useState(false);
  var count = 0;

  useEffect(() => {
    axios.get('http://localhost:5000/report/'+window.$selectedID)
      .then((res) => setReport(res.data))
      .catch ((err)=>  console.log(err))
  }, [rerender,window.$selectedID])
  
  const increaseVote = (index) =>{
    votes[index]++;
    return votes;
  }

  // Implement Scroll and login votes
  return (
    <section className="faults" id="faults">
    <Container><Row className="align-items-center" id='openFaults'>
      <h2>All Open Faults</h2>
      <TrackVisibility>
              {({ isVisible }) => isVisible ? setRerender(true): setRerender(false)}
        </TrackVisibility>
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
              <th><div onClick={(e)=>setRerender(!rerender)}>🔃</div> </th>
            </tr>
          </thead>
          <tbody>
            {report.map((row, i) => (
              <tr key={row.id}>
                <td>{++count}</td>
                <td>{window.$selectedID}</td>
                <td>{row.report}</td>
                <td><div className={row.status === 'Pending' ? "statusBarRed" : "statusBarGreen"}>{row.status === 'Pending' ? "Pending" : "Done"}</div></td>
                <td>{row.createdAt}</td>
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