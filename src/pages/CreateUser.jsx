import React, { useEffect, useState } from "react";
import axios from "axios";

import PersonAddIcon from '@material-ui/icons/PersonAdd';

/* Reference: https://colorlib.com/etc/regform/colorlib-regform-4/ */
function CreateUser() {
    let [fName, setFName]=useState("");
    let [lName, setLName]=useState("");
    let [qualification, setQualification]=useState("");
    let [mobile, setMobile]=useState("");
    let [selectedLocation, setSelectedLocation]=useState("None")
    let [selectedClass, setSelectedClass]=useState("None")


    let [location]=useState([]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVERLINK + "/locationSearchFromDatabase")
        .then((response)=>{
            response.data.forEach(element => {
                location.push(element.location);
            });
            // console.log(location);
        });
    }, );
    function handleClick(event) {
        event.preventDefault();
        let user={
            firstName: fName,
            lastName: lName,
            qualification: qualification,
            mobile: mobile,
            location: selectedLocation,
            class: selectedClass
        }

        axios.post(process.env.REACT_APP_SERVERLINK + "/createUser", user )
        .then((response)=>{
            // console.log(response.data);
        });
        

        // console.log(user);
        setFName("");
        setLName("");
        setQualification("");
        setMobile("");
    }


    function selectLocationBoxChange(){
        var selectBox = document.getElementById("selectLocationBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        // alert(selectedValue);
        setSelectedLocation(selectedValue);
    }


    function selectClassBoxChange(){
        var selectBox = document.getElementById("selectClassBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        // alert(selectedValue);
        setSelectedClass(selectedValue);
    }


    return (
        <div className="createUser" >
            <div className="formOuter" >
                <form className="createUserForm" onSubmit={handleClick} >
                    <h2><PersonAddIcon style={{ fontSize: 35}} /> Create a new user</h2>
                    <label>First Name</label>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setFName(event.target.value);
                        }}
                        value={fName}
                        required
                    />
                    <label>Last Name</label>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setLName(event.target.value);
                        }}
                        value={lName}
                        required
                    />
                    <label> Qualification</label>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setQualification(event.target.value);
                        }}
                        value={qualification}
                        required
                    />
                    <label> Mobile</label>
                    <input 
                        type="number"
                        onChange={(event)=>{
                            setMobile(event.target.value);
                        }}
                        value={mobile}
                        required
                    />
                    <label> Address</label>
                    <select id="selectLocationBox" onChange={selectLocationBoxChange} >
                        <option selected >None</option>
                        {location.map((element)=>{
                            return(
                                <option>{element}</option>
                            );
                        })}

                    </select>
                    <label> Classes</label>
                    <select id="selectClassBox" onChange={selectClassBoxChange}>
                        <option selected >None</option>
                        <option>6th - 8th</option>
                        <option>8th - 10th</option>
                        <option>10th - 12th</option>
                        <option>IITJEE</option>
                        <option>NEET</option>
                    </select>
                    <button type="submit" >Create</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;