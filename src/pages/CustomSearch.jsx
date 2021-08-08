import React, { useEffect, useState } from "react";
import axios from "axios";

import UserCard from "../components/UserCard"
import serverLink from "../serverExport"


/* Reference: https://colorlib.com/etc/regform/colorlib-regform-4/ */
function CreateUser() {
    let [fName, setFName]=useState("");
    let [lName, setLName]=useState("");
    let [qualification, setQualification]=useState("");
    let [mobile, setMobile]=useState("");
    let [selectedLocation, setSelectedLocation]=useState("")
    let [selectedClass, setSelectedClass]=useState("")


    let [location, setLocation]=useState([]);


    useEffect(()=>{
        axios.get(serverLink+"/locationSearchFromDatabase")
        .then((response)=>{
            response.data.forEach(element => {
                location.push(element.location);
            });
            // console.log(location);

            localStorage.setItem("locationArray", JSON.stringify(location))
        });
    }, []);
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

        axios.post(serverLink+"/customSearch", user )
        .then((response)=>{
            // console.log(response.data);
            localStorage.setItem("searchData", JSON.stringify(response.data))
            window.location.reload();
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

    if(localStorage.getItem("searchData")===null){
        
    return (
        <div className="createUser" >
            <div className="formOuter" >
                <form className="createUserForm" onSubmit={handleClick} >
                    <h2>🧭 Search User 🧭</h2>
                    <label>First Name</label>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setFName(event.target.value);
                        }}
                        value={fName}
                        
                    />
                    <label>Last Name</label>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setLName(event.target.value);
                        }}
                        value={lName}
                        
                    />
                    <label> Qualification</label>
                    <input 
                        type="text"
                        onChange={(event)=>{
                            setQualification(event.target.value);
                        }}
                        value={qualification}
                        
                    />
                    <label> Mobile</label>
                    <input 
                        type="number"
                        onChange={(event)=>{
                            setMobile(event.target.value);
                        }}
                        value={mobile}
                    />
                    <label> Address</label>
                    <select id="selectLocationBox" onChange={selectLocationBoxChange} >
                        <option selected ></option>
                        {location.map((element)=>{
                            return(
                                <option>{element}</option>
                            );
                        })}

                    </select>
                    <label> Classes</label>
                    <select id="selectClassBox" onChange={selectClassBoxChange}>
                        <option selected ></option>
                        <option>6th - 8th</option>
                        <option>8th - 10th</option>
                        <option>10th - 12th</option>
                        <option>IITJEE</option>
                        <option>NEET</option>
                    </select>
                    <button type="submit" >Search</button>
                </form>
            </div>
        </div>
    );
    }else{
        let searchData=JSON.parse(localStorage.getItem("searchData"))
        return(
            <div className="customSearch" >
                <div className="userCardComp"  >
                {searchData.map((element)=>{
                    return(
                        
                        <div>
                            <UserCard
                                fName={element.firstName}
                                lName={element.lastName}
                                qualification={element.qualification}
                                mobile={element.mobile}
                                location={element.location}
                                class={element.class}
                            />
                        </div>
                     );
                    })}
                </div>
            </div>
        );
    }

}

export default CreateUser;