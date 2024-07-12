import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faT } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faTachometer } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { format } from "date-fns";
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';


import {
    Navbar, Nav,
    NavDropdown,
    Container,
    Row,
    Col,
    Table,
    Form,
    Modal
} from "react-bootstrap";
import { Link } from "react-router-dom";
function Order() {

    const [order, setOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [game, setGame] = useState({
        id: "",
        name: "",
        description: "",
        priceGame: "",
        status: "",
        releaseDate: "",
        version: "",
        gameType: "",
    });

    useEffect(() => {
        setToken();
        loadGames();
    }, []);
    const setToken = () => {
        const bearertoken =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVjIiwiZW1haWwiOiJ0cmluaHBodW5naG9uZ3BodWNAZ21haWwuY29tIiwiaWF0IjoxNzIwNDI2MzI3LCJleHAiOjE3MjE5NDE0MjUsInJvbGVzIjpbIlVTRVIiXSwiaWQiOjIsImFjY291bnRCYWxhbmNlIjowLjB9.oVBcWZIKVm48DxSPRP74Z1NDQutnIW4vIoY-LnFakwU";
        localStorage.setItem("accesstoken", bearertoken);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy HH:mm');
    };

    //Search theo id
    const searchGameById = async () => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Token not found");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/orders/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setOrder(data ? [data] : []);
        } catch (error) {
            console.error(error);
        }
    };


    const handleCloseModal = () => setShowModal(false);


    //LoadALl
    // Load all order
    const loadGames = async () => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Token not found");
            return;
        }
        try {
            const response = await axios.get("http://localhost:8080/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            setOrder(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadGames();
    }, []);



    // Load all 
    // const loadGames = async () => {
    //   const token = localStorage.getItem("accesstoken");
    //   if (!token) {
    //     console.error("Token not found");
    //     return;
    //   }
    //   try {
    //     const response = await axios.get("http://localhost:8080/api/games", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const data =
    //       typeof response.data === "string"
    //         ? JSON.parse(response.data)
    //         : response.data;
    //     console.log(data);

    //     setGames(Array.isArray(data) ? data : []);
    //     // console.log(game);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // XÓa game
    const deleteGames = async (id) => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/games/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            loadGames();
        } catch (error) {
            console.error(error);
        }
    };
    // Chi tiết order
    const viewsOrderDetail = async (id) => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Token not found");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/ordersdetail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedOrder(response.data);
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };




    // Thêm game
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/games",
                game,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            loadGames();

        } catch (error) {
            console.error(error);
        }
    };



    //  edit
    //   const editGames = async (e,id) => {
    //     e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    //     const token = localStorage.getItem("accesstoken");
    //     if (!token) {
    //       console.error("Không tìm thấy token");
    //       return;
    //     }
    //     try {
    //       const response = await axios.put(
    //         `http://localhost:8080/api/games/${id}`, game,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       console.log(response.data);
    //       loadGames();
    //       handleResetForm();

    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };


    //   const onInputChange = (e) => {
    //     setGame({ ...game, [e.target.name]: e.target.value });
    //   };
    //   const handleResetForm = () => {
    //     setGame({
    //       name: "",
    //       description: "",
    //         priceGame: "",
    //         status: "",
    //        releaseDate: "",
    //         version: "",
    //         gameType: "",
    //     });
    //   };


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
                                        {/* <div className="round-icon me-2">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="0px"
              className="icon text-primary"
            />
          </div> */}
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

                {/* Sale & Revenue End */}

                {/* Sales Chart Start */}



                <input style={{ margin: '20px', marginLeft: '400px', marginTop: '30px', width: '250px', height: '37px' }}
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter ID"
                />
                <button className="btn btn-primary" onClick={searchGameById}>Search</button>



                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: 'black' }}>Chi tiết đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedOrder && (
                            <div>
                                <p><strong>Orderdetail ID:</strong> {selectedOrder.id}</p>                             
                                <p><strong>GameType:</strong> {selectedOrder.keycode.game.gameType.name}</p>
                                <p><strong>Game:</strong> {selectedOrder.keycode.game.name}</p> 
                                <p><strong>Price:</strong> {selectedOrder.keycode.game.priceGame}</p> 
                                <p><strong>Status:</strong> {selectedOrder.keycode.isActive? 'Done' : 'Pending'}</p> 
                                <p><strong>Keycode:</strong> {selectedOrder.keycode.keycode}</p>
                                <p><strong>Ceatedate Keycode:</strong> {selectedOrder.keycode.createDate}</p>
                          
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>








                <Container fluid className="pt-4 px-4">
                    <Row className="bg-secondary text-center rounded p-4">
                        <Col md={12}>
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Orders</h6>

                            </div>

                            <Table className="table text-start align-middle table-bordered table-hover mb-0 mt-3">
                                <thead>
                                    <th>STT</th>
                                    <th>Date</th>
                                    <th>Order By</th>


                                    <th scope="col">Action</th>

                                </thead>
                                <tbody>
                                    {order.map((od) => (
                                        <tr key={od.id}>
                                            <td>{od.id}</td>
                                            <td>{formatDate(od.date)}</td>
                                            <td>{od.account.username}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning mx-3"
                                                    onClick={() => {

                                                        viewsOrderDetail(od.id);
                                                    }}
                                                >
                                                    Chi tiết
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

export default Order;
