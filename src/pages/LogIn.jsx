import React, { useState } from "react"
import axios from "axios"

import swal from "sweetalert"



/*Reference: https://codepen.io/colorlib/pen/aaaoVJ?editors=1100 */

function LogIn(){

    let [username, setUsername]=useState("")
    let [password, setPassword]=useState("");



    function handleSubmit(event){
        
        event.preventDefault();
        axios.post(process.env.REACT_APP_SERVERLINK + "/login", {username: username, password: password})
        .then((response)=>{
            // console.log(response.data)
            if(response.data==="Success"){

                sessionStorage.setItem("isLoggedIn", true);

                window.location.reload();

            }else{
                // alert("Wrong username or password!")
                swal("Wrong username or password!");

                
            }
            
        });

    }

    if(sessionStorage.getItem("isLoggedIn")==="true"){
        return(
            <div className="logOut" >
                <div className="logOutForm" >
                    <h1>Current Status: Logged In</h1>
                    <button className="logInButton" onClick={()=>{
                        sessionStorage.removeItem("isLoggedIn");
                        window.location.reload();
                    }} >Log Out</button>
                </div>
            </div>
        );
    }else{
        return(
            <div className="logIn" >
                <form className="logInForm" onSubmit={handleSubmit} >
                    {/* <label className="logInFormLabel" >Username:</label> */}
                    <input type="text" className="logInFormInput" placeholder="Enter username" onChange={(event)=>{
                        setUsername(event.target.value);
                        
                    }} />
                    {/* <label className="logInFormLabel" >Password:</label> */}
                    <input type="password" className="logInFormInput" placeholder="Enter password" onChange={(event)=>{
                        setPassword(event.target.value)
                    }} />
                    <button className="logInButton" >LogIn</button>
                </form>
            </div>
        );
    }
}
export default LogIn;