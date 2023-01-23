import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserAction } from '../redux/actions/userAction';
import Form from './Form';
import List from './List';

class Home extends Component {
    fetchUsers = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/user`
            })
            this.props.dispatch(
                fetchUserAction(res.data)
            )
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <div className='container'>
                <h2 className='text-center'>User Management</h2>
                <Form fetchUsers={this.fetchUsers}/>
                <List fetchUsers={this.fetchUsers}/>
            </div>
        );
    }
    componentDidMount() {
        { this.fetchUsers() }
    }
}

export default connect()(Home);