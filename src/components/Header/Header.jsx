import {Nav, Navbar, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import baristaLifeLogo from '../../assets/baristaLifeLogo.svg'

export default function Header() {
    return (<header>
        <Navbar collapseOnSelect expand="lg" className="fixed-top border-bottom border-dark">
        <Container className="d-flex align-items-center">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img
                        src={baristaLifeLogo}
                        alt="barista life logo"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto navbar-dark">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/teams">
                        <Nav.Link>Teams</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/players">
                        <Nav.Link>Players</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>`
    </header>)
}