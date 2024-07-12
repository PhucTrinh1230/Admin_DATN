import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faT } from '@fortawesome/free-solid-svg-icons';
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

import { Navbar,   Nav,
  NavDropdown,
  Container,
  Row,
  Col,
  Table,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";



function Gametypes() {
  const [showForm, setShowForm] = useState(false);
  const [gameTypes , setGameTypes] = useState([]);
  const [gameType, setGameType] = useState({
    id:"",
    name: "",
  
  });
  

  useEffect(() => {
    setToken();
    loadGameTypes();
  }, []);
  const setToken = () => {
    const bearertoken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVjMiIsImVtYWlsIjoicGh1YzJAZ21haWwuY29tIiwiaWF0IjoxNzE5NjExOTM0LCJleHAiOjE3MjExMjcwMzIsInJvbGVzIjpbIkFETUlOIl0sImlkIjo1LCJhY2NvdW50QmFsYW5jZSI6MC4wfQ.2XPC1KYNAjTg4PqJBLR7iBaXri4tRaidh3If8qdwl2U"
  };
  // Load all users
  const loadGameTypes = async () => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/api/gametypes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;
      console.log(data);

      setGameTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };
  // Thêm Account
  const onSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/gametypes",
        gameType,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        `http://localhost:8080/api/gametypes/${id}`,
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
        `http://localhost:8080/api/gametypes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    
      setGameType(response.data); 
      toggleForm();
    } catch (error) {
      console.error(error);
    }
  };
  //  edit
  const editGameTypes = async (e,id) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Không tìm thấy token");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/api/gametypes/${id}`, gameType,
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
    setGameType({ ...gameType, [e.target.name]: e.target.value });
  };
  const handleResetForm = () => {
    setGameType({
     name:"",
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
      <NavDropdown.Item as={Link} to="/element">Other Elements</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link as={Link} to="/order" className="d-flex align-items-center">
    <div className="round-icon">
        <FontAwesomeIcon
          icon={faTh}
          size="1x"
          className="icon text-primary"
        />
      </div>
   
      <span className="ms-2">Orders</span>
    </Nav.Link>

    <Nav.Link as={Link} to="/keycode" className=" d-flex align-items-center">
    <div className="round-icon">
        <FontAwesomeIcon
          icon={faKeyboard}
          size="1x"
          className="icon text-primary"
        />
      </div>
      <span className="ms-2">Keycode</span>
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
          <Row className="g-4">
            <Col sm={6} xl={3}>
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <FontAwesomeIcon className="text-primary" icon={faChartLine} size="3x" />
                <div className="ms-3">
                  <p className="mb-2">Today Sale</p>
                  <h6 className="mb-0">$1234</h6>
                </div>
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <FontAwesomeIcon className="text-primary" icon={faChartBar} size="3x" />
              <div className="ms-3">
                  <p className="mb-2">Total Sale</p>
                  <h6 className="mb-0">$1234</h6>
                </div>
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <FontAwesomeIcon className="text-primary" icon={faChartArea} size="3x" />
              <div className="ms-3">
                  <p className="mb-2">Today Revenue</p>
                  <h6 className="mb-0">$1234</h6>
                </div>
              </div>
            </Col>
            <Col sm={6} xl={3}>
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <FontAwesomeIcon className="text-primary" icon={faChartPie} size="3x" />
              <div className="ms-3">
                  <p className="mb-2">Total Revenue</p>
                  <h6 className="mb-0">$1234</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Sale & Revenue End */}

        {/* Sales Chart Start */}
        <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Worldwide Sales</h6>
              <a href="#">Show All</a>
            </div>
            <canvas id="worldwide-sales"></canvas>
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sales & Revenue</h6>
              <a href="#">Show All</a>
            </div>
            <canvas id="sales-revenue"></canvas>
          </div>
        </div>
      </div>
    </div>

        <Container fluid className="pt-4 px-4">
          <Row className="bg-secondary text-center rounded p-4">
            <Col md={12}>
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h6 class="mb-0">GameTypes</h6>
                <a href="/">Show All</a>
              </div>
              <div
                style={{ display: showForm ? "block" : "none" }}
                className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow  "
              >
                <h2 className="text-center m-4">Thêm người dùng</h2>
                <form >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name Game
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter game name"
            name="name"
            value={gameType.name}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <button
          type="button"
          className="btn btn-outline-warning mx-3"
          onClick={(e) =>onSubmit(e)}
        >
        Thêm
        </button>

        <button
          type="button"
          className="btn btn-outline-danger mx-3"
          onClick={(e) =>editGameTypes(e, gameType.id)}
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

        <button type="button" className="btn btn-outline-info mx-3">
          Hủy
        </button>
      </form>
              </div>
              <Table className="table text-start align-middle table-bordered table-hover mb-0 mt-3">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
           
          </tr>
        </thead>
        <tbody>
          {gameTypes.map((gameType, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{gameType.name}</td>
              {/* Cột ID ẩn đi */}
              <td style={{ display: "none" }}>{gameType.id}</td>

              <td>
                <button
                  className="btn btn-warning mx-3"
                  onClick={() => viewsGameTypes(gameType.id)}
                >
                  Chi tiết
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteGameTypes(gameType.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

export default Gametypes;
