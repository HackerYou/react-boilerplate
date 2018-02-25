import React from 'react';


const Game = (props) => {
    return (
      <div className="game">
        <div className="wrap">
        
                    <div className="navigation">
                    <div className="grid">
                        <button className="moveForward" onClick={props.moveForward}>up</button>
                        <button  disabled className="moveLeft" onClick={props.moveLeft}>left</button>
                        <button disabled className="moveRight" onClick={props.moveRight}>right</button>
                        <button disabled className="moveBack" onClick={props.moveBack}>back</button>
                    </div></div>
                {props.overlay}
                {props.location}
                {/* <div className="background CreepyRoom"></div> */}
       
        </div>
        
      </div>
      )
}

export default Game;