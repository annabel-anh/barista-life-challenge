// Project:  LMS4-Team Form-Search-Generic List
//     Name: Quynh Anh Ninh
//     Submitted: 3/18/2024
//
//     I declare that the following source code was written by me, or provided
//     by the instructor for this project. I understand that copying source
//     code from any other source, providing source code to another student,
//     or leaving my code on a public web site constitutes cheating.
//     I acknowledge that  If I am found in violation of this policy this may result
//     in a zero grade, a permanent record on file and possibly immediate failure of the class.


import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from '../src/views/App/App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)