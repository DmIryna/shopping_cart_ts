import { NavLink } from "react-router-dom"
import { Navbar as NavbarBs, Nav, Container, Button } from "react-bootstrap"
import { BsCart2 } from "react-icons/bs"
import { useShoppingContext } from "../context/ShoppingCartContext"

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingContext()

  return (
    <NavbarBs className="mb-3 bg-white shadow-sm" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            <BsCart2 style={{ width: "1.5rem", height: "1.5rem" }} />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  )
}

export default Navbar
