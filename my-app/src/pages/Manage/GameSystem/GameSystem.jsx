import React, { useEffect, useState } from "react";
import axios from "axios";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faTachometer } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

import {
  Navbar, Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Table,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";



function GameSystemRequirement() {
  const [gameIds, setGameIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rankAccounts, setRankAccounts] = useState([]);
  const [rankAccount, setRankAccount] = useState({
    game: "",
    os: "",
    memory: "",
    card: "",
    proccessor: "",
    storage: "",
  });



  useEffect(() => {
    setToken();
    loadGameTypes();


fetchGameIds();
  

  }, []);


  const fetchGameIds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/games");
      setGameIds(response.data);
      console.log(gameIds);
    } catch (error) {
      console.error('Error fetching game IDs:', error);
    }
  };



  const setToken = () => {
    const bearertoken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVjIiwiZW1haWwiOiJ0cmluaHBodW5naG9uZ3BodWNAZ21haWwuY29tIiwiaWF0IjoxNzIwNDI2MzI3LCJleHAiOjE3MjE5NDE0MjUsInJvbGVzIjpbIlVTRVIiXSwiaWQiOjIsImFjY291bnRCYWxhbmNlIjowLjB9.oVBcWZIKVm48DxSPRP74Z1NDQutnIW4vIoY-LnFakwU";
    localStorage.setItem("accesstoken", bearertoken);
  };
  // Load all rqm
  const loadGameTypes = async () => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/api/gameSystemRequirement", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;


      setRankAccounts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };


  // Thêm rqm
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/gameSystemRequirement",
        rankAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      loadGameTypes();
      handleResetForm();
    } catch (error) {
      console.error(error);
    }
  };


  // XÓa Account
  const deleteGameTypes = async (id) => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/gameSystemRequirement/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      loadGameTypes();

    } catch (error) {
      console.error(error);
    }
  };
  // Chi tiết account
  const viewsGameTypes = async (id) => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/gameSystemRequirement/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRankAccount(response.data);
      toggleForm();
    } catch (error) {
      console.error(error);
    }
  };
  //  edit
  const editGameTypes = async (e, id) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/api/gameSystemRequirement/${id}`, rankAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      loadGameTypes();
      handleResetForm();

    } catch (error) {
      console.error(error);
    }
  };
  const onInputChange = (e) => {
    setRankAccount({ ...rankAccount, [e.target.name]: e.target.value });
  };
  const handleResetForm = () => {
    setRankAccount({
      game: "",
      os: "",
      memory: "",
      card: "",
      proccessor: "",
      storage: "",
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="sidebar pe-4 pb-3">
        <Navbar bg="secondary" variant="dark" className="flex-column">
          <Navbar.Brand href="index.html" className="mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-user-edit me-2"></i>ADMIN
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
              <h6 className="mb-0">NgocKhanh</h6>
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
              <NavDropdown.Item as={Link} to="/rankaccount"> Rankaccount</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gamesystemrequirement"> GameSystemRequirement</NavDropdown.Item>

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
              <NavDropdown.Item as={Link} to="/">Sign In</NavDropdown.Item>
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
          <Row className="bg-secondary text-center rounded p-4">
            <Col md={12}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">GameTypes</h6>

              </div>
              <div
                style={{ display: showForm ? "block" : "none" }}
                className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow  "
              >
                <h2 className="text-center m-4">Edit Game System Requirement</h2>
                <form >
                  <div className="mb-3">
                    <label htmlFor="game" className="form-label">
                      Game
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game price"
                      name="game"
                      value={rankAccount.game.name}
                      onChange={(e) => onInputChange(e)}
                      disabled />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="os" className="form-label">
                      Os
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game os"
                      name="os"
                      value={rankAccount.os}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="memory" className="form-label">
                      Memory
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game memory"
                      name="memory"
                      value={rankAccount.memory}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="card" className="form-label">
                      Card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game card"
                      name="card"
                      value={rankAccount.card}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="proccessor" className="form-label">
                      Proccessor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game proccessor"
                      name="proccessor"
                      value={rankAccount.proccessor}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="storage" className="form-label">
                      Storage
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game storage"
                      name="storage"
                      value={rankAccount.storage}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>


                  <button
                    type="button"
                    className="btn btn-outline-warning mx-3"
                    onClick={(e) => editGameTypes(e, rankAccount.id)}
                  >
                    Cập nhật
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-success mx-3"
                    onClick={handleResetForm}
                  >
                    Làm mới
                  </button>


                </form>
              </div>
              <Table className="table text-start align-middle table-bordered table-hover mb-0 mt-3">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Game</th>
                    <th scope="col">Os</th>
                    <th scope="col">Memory</th>
                    <th scope="col">Card</th>
                    <th scope="col">Proccessor</th>
                    <th scope="col">Storage</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {rankAccounts.map((rankAccount, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{rankAccount.game.name}</td>
                      <td>{rankAccount.os}</td>
                      <td>{rankAccount.memory}</td>
                      <td>{rankAccount.card}</td>
                      <td>{rankAccount.proccessor}</td>
                      <td>{rankAccount.storage}</td>



                      <td>
                        <button
                          style={{ width: '100px' }}
                          className="btn btn-warning mx-3"
                          onClick={() => viewsGameTypes(rankAccount.id)}
                        >
                          Detail
                        </button>
                        <button
                          style={{ width: '100px', marginTop: '20px', marginLeft: '15px' }}
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteGameTypes(rankAccount.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>


        <Container fluid className="pt-4 px-4">
          <Row className="bg-secondary text-center rounded p-4">
            <Col md={12}>

              <div
                // style={{ display: showForm ? "block" : "none" }}
                className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow  "
              >
                <h2 className="text-center m-4">Add Game System Requirement</h2>
                <form onSubmit={onSubmit} >
                  <div className="mb-3">
                    <label htmlFor="game" className="form-label">ID Game</label>
                    <select
                      className="form-control"
                      name="game.id"
                      onChange={onInputChange}
                      >
                      <option value="">Select game name</option>
                      {gameIds.map((game) => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                        ))}
               
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="os" className="form-label">
                      Os
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game os"
                      name="os"
                      value={rankAccount.os}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="memory" className="form-label">
                      Memory
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game memory"
                      name="memory"
                      value={rankAccount.memory}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="card" className="form-label">
                      Card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game card"
                      name="card"
                      value={rankAccount.card}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="proccessor" className="form-label">
                      Proccessor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game proccessor"
                      name="proccessor"
                      value={rankAccount.proccessor}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="storage" className="form-label">
                      Storage
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter game storage"
                      name="storage"
                      value={rankAccount.storage}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>


                  <button
                    type="button"
                    className="btn btn-outline-warning mx-3"
                 
                  >
                    Thêm
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-success mx-3"
                    onClick={handleResetForm}
                  >
                    Làm mới
                  </button>


                </form>
              </div>

            </Col>
          </Row>
        </Container>




        {/* Recent Sales End */}

        {/* Footer Start */}
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
        {/* Footer End */}
      </div>
      {/* Content End */}
    </div>
  );
}

export default GameSystemRequirement;
