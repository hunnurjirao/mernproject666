import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'
const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {

            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: 'applcation/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);


        } catch (error) {
            console.log(error);
            history.push('/login')
        }
    }
    useEffect(() => {
        callAboutPage()
    }, [])

    return (
        <div>



            <div className="container about-page">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="text-center">
                            <h3>USER INFO</h3>
                        </div>
                        <hr />
                        <p><b>User ID : </b>  {userData._id}</p>
                        <p><b>Name : </b>{userData.name}</p>
                        <p><b>Email : </b>{userData.email}</p>
                        <p><b>Phone : </b>{userData.phone}</p>
                        <p><b>Work  :</b>{userData.work}</p>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About