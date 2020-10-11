import React from "react";
import UserService from "../services/UserService";
import {
    Table,
    ButtonGroup,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineUserSwitch
} from "react-icons/ai";

import NewUserModal from './NewUserModal';
import './UserComponent.css';

class UserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users:[],
            showModal: false,
            isNewUser: false,
            user: {
              username: "",
              password: "",
              name: "",
              email: ""
            }
        }
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data })
        });
    }

    toggleModal() {
      const { user, showModal } = this.state;
      let resetUser = false;

      if (showModal && (user.username || user.password || user.name || user.email)) {
        resetUser = true;
      }

      this.setState({
        showModal: !this.state.showModal,
        isNewUser: !resetUser,
        user: resetUser ? {
          username: "",
          password: "",
          name: "",
          email: ""
        } :
        user
      });
    }

    openEditModal(user) {
      this.setState({
        user,
        showModal: true,
        isNewUser: false
      })
    }

    async saveUser(user) {
      if (this.state.isNewUser) {
        await UserService.createUser(user);
        this.setState({
          showModal: !this.state.showModal,
          users: [...this.state.users, user]
        });
      } else {
        await UserService.updateUser(user);
        this.setState((state) => {
          const updatedUsers = state.users.filter((item) => item.username !== user.username);


          return {
            ...state,
            users: [...updatedUsers, user]
          }
        });

        this.setState({
          showModal: !this.state.showModal
        });
      }
    }

    async removeUser(user) {
      await UserService.deleteUser(user.username);
      this.setState({
        users: this.state.users.filter((item) => item.username !== user.username)
      });
    }

    render(){
        return (
            <Container>
              <Row>
                  <h1 className = "text-center">Users List</h1>
              </Row>
              <Row>
                <Button
                  variant="success"
                  onClick={this.toggleModal.bind(this)}
                  className="add-user-button"
                >
                  <AiOutlineUserAdd/> Add User
                </Button>
              </Row>
              <Row>
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
                                        <td>
                                            <ButtonGroup aria-label="Basic example">
                                              <Button
                                                variant="info"
                                                onClick={() => {
                                                  this.openEditModal(user);
                                                }}
                                              >
                                                <AiOutlineUserSwitch/>
                                              </Button>
                                              <Button
                                                variant="danger"
                                                onClick={() => {
                                                    this.removeUser(user);
                                                }}
                                              >
                                                <AiOutlineUserDelete/>
                                              </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </Table>
              </Row>
              <NewUserModal
                isEdit={!this.state.isNewUser}
                showModal={this.state.showModal}
                toggleModal={this.toggleModal.bind(this)}
                saveUser={this.saveUser.bind(this)}
                user={this.state.user}
              />
            </Container>
        )
    }

}

export default UserComponent
