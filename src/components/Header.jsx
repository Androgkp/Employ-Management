import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";
import LogIn from "../pages/LogIn";
import CreateUser from "../pages/CreateUser";
import AddLocation from "../pages/AddLocation";
import CustomSearch from "../pages/CustomSearch";

import DeleteUser from "../pages/DeleteUser"


function sessionSwitchCheck(){
   
    if(sessionStorage.getItem("isLoggedIn")==="true"){
        return(
        
            <Switch>
            <Route exact path="/" >
                <LogIn/>
            </Route>
    
            <Route exact path="/createuser" >
                <CreateUser/>
            </Route>
    
            <Route exact path="/addlocation" >
                <AddLocation/>
            </Route>
    
            {/* <Route exact path="/search" >
                <Search/>
            </Route> */}
    
            <Route exact path="/customsearch" >
                <CustomSearch/>
            </Route>
    
            <Route exact path="/deleteuser" >
                <DeleteUser/>
            </Route>
        </Switch>
        );
    }else{
        return(
        
            <Switch>
            <Route exact path="/" >
                <LogIn/>
            </Route>
        </Switch>
        );
    }
}

function sessionLinkCheck(){
    if(sessionStorage.getItem("isLoggedIn")==="true"){
        return(
            <div className="header" >
            <Link to="/" className="link">
                <button className="headerButton" >LogOut</button>
            </Link>
            <Link to="/createuser" className="link">
                <button className="headerButton" >Add Users</button>
            </Link>
            <Link to="/addlocation" className="link">
                <button className="headerButton" >Add Location</button>
            </Link>
            {/* <Link to="/search" className="link">
                <button className="headerButton" >Search </button>
            </Link> */}
            <Link to="/customsearch" className="link" onClick={()=>{
                
                if(localStorage.getItem("searchData")!==null){
                    window.location.reload();
                    
                }
                localStorage.removeItem("searchData");
            }} >

                <button className="headerButton"  > CustomSearch </button>
            </Link>
          </div>
        );
    }else{
        return(
            <div className="header" >
            <Link to="/" className="link">
                <button className="headerButton" >LogIn</button>
            </Link>
            
          </div>
        );
    }
}

function Header(){
    return(
      <div className="routerButton" >
            <Router>
                {sessionLinkCheck()}

                {sessionSwitchCheck()}
            </Router>
      </div>
    );
}
export default Header;