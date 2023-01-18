import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
//import axios from 'axios';

export const Contact = (prop) => {
  const formInitialDetails = {
    carpark: '',
    report: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    
    
    var formBody = [];
    for (var property in formDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(formDetails[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://42.60.179.123:3000/report', {method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},body: formBody})
      .then(response => response.json())
    
    
    /*
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({carpark: formDetails['carpark'], report: formDetails['report']})
    };

    //axios.post('http://localhost:3000/users/add', user)
    //  .then(res => console.log(res.data));

    let response = await fetch("http://localhost:3000/contact", { //change to axios
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });

    

    let result = await response.json();

    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
    */
    console.log(window.$selectedID);
    await new Promise(r => setTimeout(r, 1000));
    let result = 200;

    if (result === 200) {
      setStatus({ succes: true, message: 'Fault reported successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
    console.log(formDetails);
    setFormDetails(formInitialDetails);
    setButtonText("Sent");
    document.getElementById("carpark").value = '';
    document.getElementById("message").value = '';
    
    
  };

  return (
    <section className="contact" id="connect">

      <div>
        <h2>Navigating... 🔊</h2>

        <div className='statusBarWhite'>
          <h4>350m (2min) </h4>
          <h4>$0.20/hr</h4>
          <h4>26 lots🟢</h4>
        </div>

      </div>
      <Container className="faultReporting">
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="cartoon of fault reporting"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Report a Fault</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                  <input id="carpark" required  value={window.$selectedID} placeholder='Carpark' onChange={(e) => onFormUpdate('carpark', window.$selectedID)} />
                  </Row>
                  <Row>
                  <textarea id="report" rows="6" required value={formDetails['report']} placeholder='Message' onChange={(e) => onFormUpdate('report', e.target.value)}></textarea>
                  <input type="file" id="uploadImg" name="img" accept="image/*"></input>
                  <Col size={12} className="px-1">
                  <button id="submit" style={{'borderRadius':20,'marginTop':0}}><span>{buttonText}</span></button>
                  {status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Col>
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
        <Row className="align-items-center">
        </Row>
      </Container>
    </section>
  )
}
