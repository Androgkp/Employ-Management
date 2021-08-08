import React from "react"



function UserCard(props){
    return(
        <div className="userCard" >
            <h2 className="cardName firstName" >{props.fName}</h2>
            <h2 className="cardName lastName" >{props.lName}</h2>
            <p className="cardQualification" >{props.qualification}</p>
            <p className="cardMobile" >{props.mobile}</p>
            <p className="cardLocation" >{props.location}</p>
            <p className="cardClass" >{props.class}</p>
        </div>
    );
}

export default UserCard;