import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Form extends Component {
    state = {
        values: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            type: "",
            phone: "",
        },
        errors: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            type: "",
            phone: "",
        },
    }
    handleChange = e => {
        const { value, name } = e.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        })
    }
    handleBlur = e => {
        // return lỗi
        const { name, value } = e.target;
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: this.validation(name, value)
            }
        })
    }
    handleSubmit = async e => {
        // tránh load lại trang -> single page application
        e.preventDefault();
        // check validation và return lỗi
        const { values } = this.state;
        const validationErrros = {};
        for (const key in values) {
            const error = this.validation(key, values[key]);
            if (error) validationErrros[key] = error
        }
        if (Object.keys(validationErrros).length > 0) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    ...validationErrros,
                }
            })
            return
        }
        const {id,...payload} = this.state.values;
        try {
            if (id) {
                await axios({
                    method: "PUT",
                    url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/user/${id}`,
                    data: payload
                })
            }
            else {
                await axios({
                    method: "POST",
                    url: `https://63c63b30dcdc478e15bd64d9.mockapi.io/user`,
                    data: payload
                })
            }
            this.props.fetchUsers();
            this.setState({
                values: {
                    fullname: "",
                    username: "",
                    email: "",
                    password: "",
                    type: "",
                    phone: "",
                },
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    validation = (name, value) => {
        switch (name) {
            case "username": {
                if (!value) return "User name cannot be empty"
                // if(!/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value)) return "User name is 8-20 characters long"
                return ""
            }
            case "fullname": {
                if (!value) return "Full name cannot be empty"

                return ""
            }
            case "email": {
                if (!value) return "Email cannot be empty"
                // if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return "Email is not valid"
                return ""
            }
            case "phone": {
                if (!value) return "Phone field cannot be empty"
                // if(!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) return "Phone is not valid"
                return ""
            }
            case "password": {
                if (!value) return "Password field cannot be empty"
                // regex password here
                return ""
            }
            case "type": {
                if (!value) return "Type cannot be empty"
                // regex type here
                return ""
            }
        }
    }
    render() {
        const { values, errors } = this.state;
        return (
            <div className='card'>
                <div className="card-header">
                    <h4>Registor form</h4>
                </div>
                <div className="card-body">
                    <form action="" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <span>User name</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name="username" value={values.username} onBlur={this.handleBlur} />
                                {errors.username && <span className="text-danger">{errors.username}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Full name</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name="fullname" value={values.fullname} onBlur={this.handleBlur} />
                                {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Email </span>
                                <input type="text" className="form-control" onChange={this.handleChange} name="email" value={values.email} onBlur={this.handleBlur} />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Phone</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name="phone" value={values.phone} onBlur={this.handleBlur} />
                                {errors.phone && <span className="text-danger">{errors.phone}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Password</span>
                                <input type="password" className="form-control" onChange={this.handleChange} name="password" value={values.password} onBlur={this.handleBlur} />
                                {errors.password && <span className="text-danger">{errors.password}</span>}
                            </div>
                            <div className="col-6 mb-3">
                                <span>Type</span>
                                <input type="text" className="form-control" onChange={this.handleChange} name="type" value={values.type} onBlur={this.handleBlur} />
                                {errors.type && <span className="text-danger">{errors.type}</span>}
                            </div>
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
    componentDidUpdate(preProps) {
        const { selectedUser } = this.props;
        if (selectedUser && selectedUser !== preProps.selectedUser) {
            this.setState({
                values: selectedUser
            })
        }
    }
}

export default connect(state => ({
    selectedUser: state.userReducer.selectedUser,
}))(Form)