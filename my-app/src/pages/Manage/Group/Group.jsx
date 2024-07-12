import React, { useEffect, useState } from "react";
import axios from "axios";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
    Modal,
    Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
function Group() {
    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [keycodes, setKeycodes] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [keycode, setKeycode] = useState({
        id: "",
        name: "",
        account: { id: "" },
        
    });


    const [searchId, setSearchId] = useState('');


    useEffect(() => {
        setToken();
        loadKeycode();
    }, []);
    const setToken = () => {
        const bearertoken =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVjIiwiZW1haWwiOiJ0cmluaHBodW5naG9uZ3BodWNAZ21haWwuY29tIiwiaWF0IjoxNzIwNDI2MzI3LCJleHAiOjE3MjE5NDE0MjUsInJvbGVzIjpbIlVTRVIiXSwiaWQiOjIsImFjY291bnRCYWxhbmNlIjowLjB9.oVBcWZIKVm48DxSPRP74Z1NDQutnIW4vIoY-LnFakwU";
        localStorage.setItem("accesstoken", bearertoken);
    };

    //Search theo id
    const searchGameById = async () => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Token not found");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/group/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            setKeycodes(data ? [data] : []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    // Load all
    const loadKeycode = async () => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Token not found");
            return;
        }
        try {
            const response = await axios.get("http://localhost:8080/api/group", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            setKeycodes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadKeycode();
    }, []);



    // XÓa group
    const updateKeycodeStatus = async (id) => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/group/${id}`,
                { status: 0 },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            loadKeycode();
        } catch (error) {
            console.error(error);
        }
    };




    // Chi tiết group
    const viewsGames = async (id) => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }
        try {
            const response = await axios.get(
                `http://localhost:8080/api/group/${id}/details`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setSelectedGroup(response.data);
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };




    // Thêm group
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/group",
                keycode,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            loadKeycode();
            handleResetForm();
        } catch (error) {
            console.error(error);
        }
    };



    //  edit keycode
    const editGames = async (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:8080/api/group/${id}`,
                keycode,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            loadKeycode();
            handleResetForm();
        } catch (error) {
            console.error(error);
        }
    };

    const onInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setKeycode((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const onGameIdChange = (e) => {
        const { value } = e.target;
        setKeycode((prevState) => ({
            ...prevState,
            game: {
                ...prevState.game,
                id: value,
            },
        }));
    };

    // const onInputChange = (e) => {
    //     const { name, type, checked, value } = e.target;
    //     const newValue = type === "checkbox" ? checked : value;
    //     setKeycodes({
    //         ...keycode,
    //         [name]: newValue,
    //     });
    // };

    const handleResetForm = () => {
        setKeycode({
         
          
        });
        setShowForm(false);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const toggleForm2 = () => {
        setShowForm2(!showForm2);
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



                {/* <input style={{ margin: '20px', marginLeft: '400px', marginTop: '30px', width: '250px', height: '37px' }}
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Game ID"
                />
                <button className="btn btn-primary" onClick={searchGameById}>Search</button><br></br> */}

             

                <button className="btn btn-primary"  style={{marginLeft:'20px'}}  onClick={() => {
                                                        toggleForm2();
                                                    
                                                    }}>Add Group</button>









                <Container fluid className="pt-4 px-4">
                    <Row className=" text-center rounded p-4" style={{backgroundColor:'rgb(25,26,28)'}}>
                        <Col md={12}>
                         
                        <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: 'black' }}>Chi tiết Nhóm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedGroup && (
                            <div>
                                <p><strong>Group ID</strong> {selectedGroup.groupId}</p>
                                <p><strong>Total Members:</strong> {selectedGroup.totalMembers}</p>                             
                                <p><strong>ID members: </strong> {selectedGroup.memberIds.join(', ')}</p> 
                               
                          
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>



                            <Table className="table text-start align-middle table-bordered table-hover mb-0 mt-3">
                                <thead>
                                    <tr>
                                     
                                        <th>ID Group</th>
                                        <th>Name Group</th>
                                        <th> ID Originator</th>
                                      
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {keycodes.map((kc, index) => (
                                        <tr key={kc.id}>
                                        
                                            <td>{kc.id}</td>
                                            <td>{kc.name}</td>
                                            <td>{kc.account.id}</td>
                                           
                                            <td>
                                                <button 
                                                    className="btn btn-warning mx-3"
                                                    onClick={() => {
                                                        toggleForm();
                                                        viewsGames(kc.id);
                                                    }}
                                                >
                                                    Chi tiết
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => updateKeycodeStatus(kc.id)}
                                                >
                                                    Giải tán nhóm
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

                {/* <Container  className="pt-1 px-4">
            <Row className="bg-secondary text-center rounded p-4">
                <Col md={12}>
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"   style={{ display: showForm2 ? "block" : "none" }}>
                        <h2 className="text-center m-4">Add Group</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">ID Group</label>
                                <input
                                    className="form-control"
                                    placeholder="Enter Create Date"
                                    name="createDate"
                                    value={keycode.id}
                                    onChange={onInputChange}
                                />
                            </div>
                     
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your keycode"
                                    name="keycode"
                                    value={keycode.namegroup}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Member</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="gameId"
                                    value={keycode.account.id}
                                    onChange={onGameIdChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-warning mx-3"
                            >
                                Thêm
                            </button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container> */}
                {/* Recent Sales End */}

                {/* Footer Start */}
                <Container fluid className="pt-0 px-4">
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

export default Group;
