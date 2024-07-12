import React, { useEffect, useState, PureComponent } from "react";
import axios from "axios";
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine} from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { faChartPie} from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faTachometer } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faFile} from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

import "./style.css";
import "./bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Navbar,   Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Table,
  Form,
  Tooltip,
  Card,
  Image,
  Button,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";



function widget() {
 
  

  


  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="sidebar pe-4 pb-3 ">
      <Navbar bg="secondary" variant="dark" className="flex-column">
<Navbar.Brand href="index.html" className="mx-4 mb-3">
  <h3 className="text-primary">
    <i className="fa fa-user-edit me-2"></i>ADMIM
  </h3>
</Navbar.Brand>
<div className="d-flex align-items-center ms-4 mb-4">
  <div className="position-relative">
    <img
      className="rounded-circle"
      src=""
      alt=""
      style={{ width: '40px', height: '40px' }}
    />
    <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
  </div>
  <div className="ms-3">
    <h6 className="mb-0">Ngoc Khanh</h6>
    <span>Admin</span>
  </div>
</div>
<Nav className="w-100 flex-column">
  <Nav.Link as={Link} to="/" className="active d-flex align-items-center">
  <div className="round-icon">
      <FontAwesomeIcon
        icon={faTachometer}
        size="1x"
        className="icon text-primary"
      />
    </div>
    <span className="ms-2">Dashboard</span>
  </Nav.Link>



  <NavDropdown
    title={
      <div className="d-flex align-items-center">
        <div className="round-icon me-2">
          <FontAwesomeIcon
            icon={faLaptop}
            size="1x"
            className="icon text-primary"
          />
        </div>
        <span>Elements</span>
      </div>
    }
    id="nav-dropdown"
  >
    <NavDropdown.Item as={Link} to="/game">Game</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/gametypes">GameTypes</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/element">Other Elements</NavDropdown.Item>
  </NavDropdown>



  <Nav.Link as={Link} to="/widget" className="d-flex align-items-center">
  <div className="round-icon">
      <FontAwesomeIcon
        icon={faTh}
        size="1x"
        className="icon text-primary"
      />
    </div>
 
    <span className="ms-2">Widget</span>
  </Nav.Link>


  <Nav.Link as={Link} to="/form" className=" d-flex align-items-center">
  <div className="round-icon">
      <FontAwesomeIcon
        icon={faKeyboard}
        size="1x"
        className="icon text-primary"
      />
    </div>
    <span className="ms-2">Forms</span>
  </Nav.Link> 





  <Nav.Link as={Link} to="/table" className=" d-flex align-items-center">
  <div className="round-icon">
      <FontAwesomeIcon
        icon={faTable}
        size="1x"
        className="icon text-primary"
      />
    </div>
    <span className="ms-2">Tables</span>





  </Nav.Link>
  <Nav.Link as={Link} to="/chart" className=" d-flex align-items-center">
  <div className="round-icon">
      <FontAwesomeIcon
        icon={faChartBar}
        size="1x"
        className="icon text-primary"
      />
    </div>
    <span className="ms-2">Charts</span>

  </Nav.Link>
  <NavDropdown
    title={
      <div className="d-flex align-items-center">
        <div className="round-icon me-2">
          <FontAwesomeIcon
            icon={faFile}
            size="1x"
            className="icon text-primary"
          />
        </div>
        <span>Pages</span>
      </div>
    }
    id="nav-dropdown"
  >
    <NavDropdown.Item as={Link} to="/signup">Sign In</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/">Sign Up</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/">404 error</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/">Blank Page</NavDropdown.Item>

  </NavDropdown>
</Nav>
</Navbar>
      </div>
      {/* Sidebar End */}

      {/* Content Start */}
      <div className="content">
        {/* Navbar Start */}
        <Navbar
          expand="lg"
          bg="secondary"
          variant="dark"
          className="sticky-top px-4 py-0"
        >
          <Navbar.Brand href="index.html" className="d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0">
              <i className="fa fa-user-edit"></i>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link href="#" className="sidebar-toggler flex-shrink-0">
              <FontAwesomeIcon className="text-primary" icon={faBars} size="1x" />

              </Nav.Link>
              <Form className="d-none d-md-flex ms-4">
                <Form.Control
                  className="bg-dark border-0"
                  type="search"
                  placeholder="Search"
                />
              </Form>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
        <div className="round-icon me-2">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="0px"
            className="icon text-primary"
          />
        </div>
        <span className="d-none d-lg-inline-flex">Message</span>
      </div>
           
                }
                id="nav-dropdown-messages"
              >
                <NavDropdown.Item href="#">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="ms-2">
                      <h6 className="fw-normal mb-0">
                        Jhon send you a message
                      </h6>
                      <small>15 minutes ago</small>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="ms-2">
                      <h6 className="fw-normal mb-0">
                        Jhon send you a message
                      </h6>
                      <small>15 minutes ago</small>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="ms-2">
                      <h6 className="fw-normal mb-0">
                        Jhon send you a message
                      </h6>
                      <small>15 minutes ago</small>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" className="text-center">
                  See all message
                </NavDropdown.Item>
              </NavDropdown>




              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
        <div className="round-icon me-2">
          <FontAwesomeIcon
            icon={faBell}
            size="1x"
            className="icon text-primary"
          />
        </div>
        <span>Notificatin</span>
      </div>
                }
                id="nav-dropdown-notifications"
              >
                <NavDropdown.Item href="#">
                  <h6 className="fw-normal mb-0">Profile updated</h6>
                  <small>15 minutes ago</small>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  <h6 className="fw-normal mb-0">New user added</h6>
                  <small>15 minutes ago</small>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  <h6 className="fw-normal mb-0">Password changed</h6>
                  <small>15 minutes ago</small>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" className="text-center">
                  See all notifications
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <span>
                    <img
                      className="rounded-circle me-lg-2"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span className="d-none d-lg-inline-flex">John Doe</span>
                  </span>
                }
                id="nav-dropdown-user"
              >
                <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* Navbar End */}

        {/* Sale & Revenue Start */}
      
        
        <Container fluid className="pt-4 px-4">
            <Row className="g-4">
                <Col sm={12} md={6} xl={4}>
                    <Card className="h-100 bg-secondary rounded p-4">
                        <Card.Header className="d-flex align-items-center justify-content-between mb-2">
                            <Card.Title className="mb-0">Messages</Card.Title>
                            <Card.Link href="#">Show All</Card.Link>
                        </Card.Header>
                        {[...Array(4)].map((_, index) => (
                            <React.Fragment key={index}>
                                <ListGroup.Item className="d-flex align-items-center border-bottom py-3">
                                    <Image src="img/user.jpg" roundedCircle style={{ width: '40px', height: '40px' }} />
                                    <div className="w-100 ms-3">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-0">Jhon Doe</h6>
                                            <small>15 minutes ago</small>
                                        </div>
                                        <span>Short message goes here...</span>
                                    </div>
                                </ListGroup.Item>
                            </React.Fragment>
                        ))}
                    </Card>
                </Col>
                <Col sm={12} md={6} xl={4}>
                    <Card className="h-100 bg-secondary rounded p-4">
                        <Card.Header className="d-flex align-items-center justify-content-between mb-4">
                            <Card.Title className="mb-0">Calender</Card.Title>
                            <Card.Link href="#">Show All</Card.Link>
                        </Card.Header>
                        <div id="calender"></div>
                    </Card>
                </Col>
                <Col sm={12} md={6} xl={4}>
                    <Card className="h-100 bg-secondary rounded p-4">
                        <Card.Header className="d-flex align-items-center justify-content-between mb-4">
                            <Card.Title className="mb-0">To Do List</Card.Title>
                            <Card.Link href="#">Show All</Card.Link>
                        </Card.Header>
                        <div className="d-flex mb-2">
                            <Form.Control className="bg-transparent" type="text" placeholder="Enter task" />
                            <Button variant="primary" className="ms-2">Add</Button>
                        </div>
                        {[...Array(5)].map((_, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center border-bottom py-2">
                                <Form.Check type="checkbox" className="m-0" defaultChecked={index === 2} />
                                <div className="w-100 ms-3">
                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                        <span className={index === 2 ? 'text-decoration-line-through' : ''}>Short task goes here...</span>
                                        <Button variant="link" className={`btn-sm ${index === 2 ? 'text-primary' : ''}`}>
                                            <i className="fa fa-times"></i>
                                        </Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </Card>
                </Col>
                <Col sm={12} xl={6}>
                    <Card className="bg-secondary rounded h-100 p-4">
                        <Card.Body>
                            <Card.Title>Testimonial</Card.Title>
                            <div className="owl-carousel testimonial-carousel">
                                {['img/testimonial-1.jpg', 'img/testimonial-2.jpg'].map((img, index) => (
                                    <div key={index} className="testimonial-item text-center">
                                        <Image src={img} roundedCircle style={{ width: '100px', height: '100px' }} className="mx-auto mb-4" />
                                        <Card.Title>Client Name</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Profession</Card.Subtitle>
                                        <Card.Text>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</Card.Text>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} xl={6}>
                    <Card className="bg-secondary rounded h-100 p-4">
                        <iframe
                            className="position-relative rounded w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                            frameBorder="0"
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                            style={{ filter: 'grayscale(100%) invert(92%) contrast(83%)', border: 0 }}
                        ></iframe>
                    </Card>
                </Col>
            </Row>
        </Container>
        {/* Sale & Revenue End */}
       
        
      
       
       
        {/* Footer End */}
        <Container fluid className="pt-4 px-4">
            <Row className="bg-secondary rounded-top p-4">
              <Col md={12} className="text-center">
                <p className="mb-0">
                  &copy;{" "}
                  <a className="text-primary" href="#">
                    Your Site Name
                  </a>
                  . All Rights Reserved. Designed by{" "}
                  <a className="text-primary" href="https://htmlcodex.com">
                    HTML Codex
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
      </div>
      {/* Content End */}
    </div>
  );
}

export default widget;
