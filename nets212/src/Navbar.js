import React from 'react'
import { Navbar,Nav,Form,FormControl,Button, NavDropdown } from 'react-bootstrap'



class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", url: "/user/" + this.props.id};
    } 

    handleChange = (e) => {
        //function to display the suggestions when typing. 
    }
    
    handleSubmit = (e) => {
        //function that handles when the search bar is submitted
    }
    
    render () {
        return (
            <Navbar bg="dark" expand="lg" variant="dark" sticky="top" class="m-0 p-0">
                <Navbar.Brand href="/home">PennBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/messages">Messages</Nav.Link>
                    <NavDropdown title="Notifications" id="basic-nav-dropdown">
                        <NavDropdown.Item> Notification 1</NavDropdown.Item>
                        <NavDropdown.Item> Notification 2</NavDropdown.Item>
                        <NavDropdown.Item>Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/Notifications">See all Notifications</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href={this.state.url}> {this.props.name}</Nav.Link>

                 </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search for" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    } 
}
export default NavigationBar;