import React from "react";
import Skeleton from "react-loading-skeleton";

function HomeWelcome({welcome}) {
  console.log(welcome, "From Welcome")
  return (
    <>
      <div className="welcome">
        <div className="container">
          <p className="welcome-title">Welcome to Hotel SNG</p>
          <p className="welcome-message">
            {welcome ? welcome.welcome_message : <Skeleton width={100} height={60}/> }
          </p>
          {
            welcome ===  "undefined" ? <Skeleton/> : (
              <img src={welcome?.head_person_signature} />
            ) 
          }

          <div className="general-manager">
            <p className="manager-name">{welcome ? welcome.head_person : <Skeleton/> }</p>
             {welcome ? welcome.head_person_designation : <Skeleton/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWelcome;
