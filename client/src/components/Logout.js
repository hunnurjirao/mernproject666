import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const Logout = () => {

    const { state, dispatch } = useContext(UserContext)

    const history = useHistory();
    useEffect(() => {

        fetch('/logout', {
            method: 'GET',

            headers: {
                Accept: 'applcation/json',
                'Content-Type': 'application/json'
            },

            credentials: "include"
        }).then((res) => {

            dispatch({ type: "USER", payload: false })
            history.push('/login', { replace: true })
            if (res.status != 200) {
                console.log("Logout Failed!");

            }
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <div>
            <h1>Logout Successfully</h1>
        </div>
    )
}

export default Logout
