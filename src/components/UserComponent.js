import React from "react";
import UserService from "../services/UserService";
import Table from 'react-bootstrap/Table'

class UserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data })
        });
    }

    render(){
        return (
            <div>
                <h1 className = "text-center">Users List</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Password</td>
                            <td>Name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.username}>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default UserComponent