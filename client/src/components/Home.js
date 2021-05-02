import React, { useEffect, useState } from 'react'
import '../App.css'


const Home = () => {

    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {

            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true)


        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        userHomePage()
    }, [])

    return (
        <>
            <div className="conatiner home-page">
                <div className="row">
                    <div className="col-md-8 offset-md-5">

                        <h1>{userName}</h1>
                        <h3>{show ? 'Happy to see you back!' : 'We are MERN Developer'}</h3>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Home
