import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
//import axios from 'axios';

export const Contact = () => {
  const formInitialDetails = {
    carpark: '',
    message: ''
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
    //axios.post('http://localhost:3000/users/add', user)
    //  .then(res => console.log(res.data));
    console.log(formDetails);
    
    /*let response = await fetch("http://localhost:3000/contact", { //change to axios
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
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
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

                    <Col size={12} sm={6} className="px-1">
                      <input id="carpark" required  value={formDetails.carpark} placeholder='Carpark' onChange={(e) => onFormUpdate('carpark', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input id="tel" required value={formDetails.phone} placeholder='Phone' onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea id="message" rows="6" required value={formDetails.message} placeholder='Message' onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button id="submit" style={{'borderRadius':20,'marginTop':0}}><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
