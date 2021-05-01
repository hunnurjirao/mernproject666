import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory()

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })

    let name, value;

    const handleInputs = (e) => {
        console.log(e)

        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault()

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch('./register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();



        if (res.status === 201) {
            window.alert("Registration Successful")
            history.push('/login')
        } else {
            window.alert("Registration Failed")
        }
    }
    return (
        <>
            <section>
                <div className="container mt-5">
                    <div className='row'>

                        <div className="col-sm-6 offset-md-3 offset-sm-1 ">
                            <form method='POST'>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInputs}
                                        placeholder="Enter your name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputs}
                                        placeholder="Enter your Email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone No.</label>
                                    <input type="tel" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInputs}
                                        placeholder="Enter your Phone No." />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="work">Work</label>
                                    <input type="text" className="form-control" id="work" name="work" value={user.work} onChange={handleInputs}
                                        placeholder="Enter your work" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputs}
                                        placeholder="Enter your Password" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">Confirm password</label>
                                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={user.cpassword} onChange={handleInputs}
                                        placeholder="Confirm password" />
                                </div>
                                <NavLink to='/login'>Already Registered, then Login here!</NavLink><br /><br />
                                <button type="submit" className="btn btn-primary" id='register' name='register' onClick={PostData}>Register</button>

                            </form>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default Register