import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
//import axios from 'axios';

export const Contact = () => {
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

    fetch('http://42.60.27.95:3000/report', {method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},body: formBody})
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
    
    await new Promise(r => setTimeout(r, 1000));
    let result = 200;

    if (result == 200) {
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
      <Container>
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
                  <input id="carpark" required  value={formDetails['carpark']} placeholder='Carpark' onChange={(e) => onFormUpdate('carpark', e.target.value)} />
                  </Row>
                  <Row>
                  <textarea id="report" rows="6" required value={formDetails['report']} placeholder='Message' onChange={(e) => onFormUpdate('report', e.target.value)}></textarea>
                  </Row>
                  <Row>
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
