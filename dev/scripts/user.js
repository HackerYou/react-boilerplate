import React from 'react';


const User = (props) => {
    return (
        <div className="user">

        <div className="wrap">
        <div className="flex">
                    <div className="grid">  <h2 className="characterName">{props.characterName}</h2>
                    <button onClick={props.signOut}>Sign Out</button>
                    <h2 className="health"> {props.health}/10</h2><img src="../../heart.gif" alt="heart" /></div>   
                       

                    <div className="flashlight" onClick={props.clickFlashlight}> {props.flashlightImg} 
                    
                        {props.batteryLife}
                    </div>
                    <div className="batteries"><h2>{`X ${props.battery}`}</h2><img src="../../battery.png" alt="battery" /></div>
        </div>
        </div>

        </div>
    )
}

export default User;