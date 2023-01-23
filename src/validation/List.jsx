import axios from 'axios'
import React, { Component } from 'react'
import { connect } from "react-redux"
import { selectUserAction } from '../redux/actions/userAction'

class List extends Component {
    handleDelete = async id => {
        try {
            await axios({
                method: "DELETE",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/user/${id}`
            })
            this.props.fetchUsers()
        } catch (err) {
            console.log(err)
        }
    }
    handleSelect = async id => {
        try {
            const res = await axios({
                method: "GET",
                url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/user/${id}`
            })
            this.props.dispatch(
                selectUserAction(res.data)
            )
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <div className='card mt-3'>
                <div className="card-header">
                    <h4> User list</h4>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Username</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button className="btn btn-info">Edit</button>
                            <button className="btn btn-danger ms-2">Delete</button>
                        </td>
                    </tr> */}
                            {this.props.users.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.type}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleSelect(item.id)}
                                            className="btn btn-info">Edit</button>
                                        <button
                                            onClick={() => this.handleDelete(item.id)}
                                            className="btn btn-danger ms-2">Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default connect(state => ({
    users: state.userReducer.users,
    selectedUser: state.userReducer.selectedUser,
}))(List);
