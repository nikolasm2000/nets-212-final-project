import React, {useState} from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button, Container } from 'react-bootstrap'



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
            <div>
                <Navbar bg="dark" variant="dark" fixed="top"> 
                <Container>
                        <Navbar.Brand href="/home">
                            PennBooks
                        </Navbar.Brand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search for Users" onChange={this.handleChange}/>
                            <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                </Container>
                <Container>
                    <Navbar.Text>
                        Signed in as: <a href={this.state.url}>{this.props.name}</a>       
                    </Navbar.Text>
                    <Navbar.Text>
                        <a href="/messages"> Messages! </a>
                    </Navbar.Text>
                </Container>
                <Container>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Notifications 
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item">First</a>
                        <a class="dropdown-item">Second</a>
                        <a class="dropdown-item">Third</a>
                    </div>
                    <Navbar.Text>
                        <a href="/"> Log Out! </a>
                    </Navbar.Text>
                </Container>


                </Navbar>
            </div>
        )
    } 
}
export default NavigationBar;