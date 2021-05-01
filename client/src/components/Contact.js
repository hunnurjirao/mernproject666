import React, { useEffect, useState } from 'react'
import '../App.css'

const Contact = () => {

    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

    const callContactPage = async () => {
        try {

            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });


        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        callContactPage()
    }, [])

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value })
    }

    const contactForm = async (e) => {
        e.preventDefault()

        const { name, email, phone, message } = userData;

        const res = await fetch('./contact', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("message not sent");
        } else {
            alert("Message sent")
            setUserData({ ...userData, message: '' })
        }
    }

    return (
        <>
            <div className="container contact-form">
                <div className="row mt-5">
                    <div className="col-md-8 offset-md-2">
                        <form method="POST">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                        value={userData.name} onChange={handleInputs} placeholder="Name" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                        value={userData.email} onChange={handleInputs} placeholder="Email" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" className="form-control" id="phone" name="phone"
                                        value={userData.phone} onChange={handleInputs} placeholder="Phone No." />
                                </div>
                            </div> <br />
                            <div className="form-group">
                                <label htmlFor="message">message</label>
                                <textarea className="form-control" id="message" name="message"
                                    placeholder="Message here..." value={userData.message} onChange={handleInputs} rows="6"></textarea>
                            </div>

                            <button type="submit" onClick={contactForm} className="btn btn-primary">Send</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact