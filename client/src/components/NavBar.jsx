import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <>
      <Navbar className="shadow">
        <Container fluid>
          {/* <Navbar.Brand className="fw-bold">Habit Tracker</Navbar.Brand> */}
          <Nav className="me-auto">
            <NavLink
              to="/"
              className="me-3"
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "",
                  color: "black",
                };
              }}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transactions"
              className="me-3"
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "",
                  color: "black",
                };
              }}
            >
              Transactions
            </NavLink>
            <NavLink
              to="/transactions/create"
              className="me-3"
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "",
                  color: "black",
                };
              }}
            >
              Create Transaction
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
