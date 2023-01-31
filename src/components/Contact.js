import { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import axios from 'axios';

export const Contact = (prop) => {
  const formInitialDetails = {
    carpark: window.$selectedID||'',
    report: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [rerender, setRerender] = useState(false);

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  useEffect(() => {}, [rerender])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    var result = 400;

    console.log(formDetails);
    axios.post('http://localhost:5000/report/', formDetails)
      .then(result = 200)
      .catch(err => console.log(err.response));
    

    if (result === 200) {
      setStatus({ success: true, message: 'Fault reported successfully'});
    } else {
      setStatus({ success: false, message: 'Something went wrong, please try again later.'});
    }
    await new Promise(r => setTimeout(r, 1000));
    setStatus({ success: true, message: ''});
    setFormDetails(formInitialDetails);
    setButtonText("Sent");
    
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
                  <input id="carpark" required  value={window.$selectedID} placeholder='Carpark' onClick={(e)=>{setRerender(!rerender); onFormUpdate('carpark', window.$selectedID);}}/>
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
