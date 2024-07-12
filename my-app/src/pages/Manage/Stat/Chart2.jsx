import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometer, faLaptop, faTh, faKeyboard, faTable, faChartBar, faFile, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#FFAC19', '#FF5A19', '#F219FF', '#19FF22', '#1919FF', '#1919FF'];


function Chart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2023');

  const [data2, setData2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);



  useEffect(() => {
    setToken();
    loadChartData(selectedYear);
    loadPieChartData();
  }, [selectedYear]);

  const setToken = () => {
    const bearertoken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVjIiwiZW1haWwiOiJ0cmluaHBodW5naG9uZ3BodWNAZ21haWwuY29tIiwiaWF0IjoxNzIwNzc3NTAxLCJleHAiOjE3MjIyOTI2MDAsInJvbGVzIjpbIlVTRVIiXSwiaWQiOjIsImFjY291bnRCYWxhbmNlIjowLjB9.yRfGzA9G8BZ3_Miq37tcwiWXq6ABcLEYG6qIUD5bmaI";
    localStorage.setItem("accesstoken", bearertoken);
  };

  const loadChartData = async (year) => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/data${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;

      if (responseData && typeof responseData === 'object') {
        const formattedData = Object.keys(responseData).map(key => ({
          name: key,
          value: responseData[key]
        }));

        setData(formattedData);
        setIsLoading(false);
      } else {
        console.error('Data format is incorrect');
      }
    } catch (error) {
      console.error(error);
    }
  };



  const loadPieChartData = async () => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/games/profit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData2 = response.data;

      if (responseData2 && typeof responseData2 === 'object') {
        const formattedData = Object.keys(responseData2).map(key => ({
          name: key,
          value: responseData2[key]
        }));

        setData2(formattedData);
        setIsLoading2(false);
      } else {
        console.error('Data format is incorrect');
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' ,height:'10px'}).format(value).replace('₫', 'VND');
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
                        icon={faBell}
                        size="1x"
                        className="icon text-primary"
                      />
                    </div>
                    <span>Notificaton</span>
                  </div>
                }
                id="notification-dropdown"
              >
                <NavDropdown.Item as={Link} to="/">
                  <h6 className="fw-normal mb-0">Profile updated</h6>
                  <small>15 minutes ago</small>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  <h6 className="fw-normal mb-0">New user added</h6>
                  <small>15 minutes ago</small>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  <h6 className="fw-normal mb-0">Password changed</h6>
                  <small>15 minutes ago</small>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/" className="text-center">
                  See all notifications
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <div className="round-icon me-2">
                      <img
                        className="rounded-circle"
                        src=""
                        alt=""
                        style={{ width: '40px', height: '40px' }}
                      />
                    </div>
                    <span>John Doe</span>
                  </div>
                }
                id="profile-dropdown"
              >
                <NavDropdown.Item as={Link} to="/">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">Settings</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* Navbar End */}

        {/* Combobox to select year */}
        <Container className="mt-3">
          
          <Row>
            <Col>
            <Form>
                <Form.Group controlId="yearSelect">
                  <Form.Label> <h5 style={{color:'#dcdcdc'}}>Biểu đồ doanh thu của năm </h5></Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    {/* Add more years as needed */}
                  </Form.Control>
                </Form.Group>
                <br></br>
                <a href="/chartdetail">Detail</a>
              </Form> 
            </Col>
          </Row>

          <div className="container-fluid pt-2 px-2">
          <div className="bg-secondary text-center rounded p-2">
        
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {/* <YAxis tickFormatter={formatCurrency} /> */}
                <Tooltip formatter={formatCurrency} />
                <Legend />
                <Bar dataKey="value" fill="#5257eb">
                  <LabelList dataKey="value" position="top" formatter={formatCurrency} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
         
          </div>
        </div>

     
        </Container>
       

<Container>
        <div className="container-fluid pt-2 px-2">
          <div className="bg-secondary text-center rounded p-2">
      <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={data2}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {data2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          </div>
      </div>
      </Container>
      </div>
  

  
    
      <a href="#" className="btn btn-lg btn-light back-to-top">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16" style={{marginLeft:'-2px'}}>
  <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
</svg>
      </a>
    </div>
  );
}

export default Chart;
