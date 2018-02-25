import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import User from './user';


var config = {
  apiKey: "AIzaSyDWFMkKgdoclhdeAYPJNIZpOWvJnOGrrIQ",
  authDomain: "turn-out-the-lights.firebaseapp.com",
  databaseURL: "https://turn-out-the-lights.firebaseio.com",
  projectId: "turn-out-the-lights",
  storageBucket: "turn-out-the-lights.appspot.com",
  messagingSenderId: "556999435071"
};

firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      createEmail: '',
      createPassword: '',
      loginEmail: '',
      loginPassword: '',
      loggedIn: false,
      characterLocation: '',
      characterName: '',
      newUser: true,
      health:10,
      battery: 3,
      flashlight: true,
      batteryLife: 3,
      locationX: 1,
      locationY: 1,
      // nameCharacter: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addName = this.addName.bind(this);
    this.clickFlashlight = this.clickFlashlight.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }
  handleChange(event, field) {
    const newState = Object.assign({}, this.state);
    newState[field] = event.target.value;
    this.setState(newState);
  }

  addName(event) {
    event.preventDefault();
    console.log('wow1');
    // this.nameCharacter();
    this.state.newUser= false;
    const characterName = this.state.characterName;
    const dbref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
      dbref.push(this.state.characterName);
    return characterName;
  }

  // characterName() {
  //   this.characterName = this.state.characterName
  // }
  signOut() {
    firebase.auth().signOut().then(function (success) {
      console.log('Signed out!')
    }, function (error) {
      console.log(error);
    });
  }

  createUser(event) {
    event.preventDefault();
    const email = this.state.createEmail;
    const password = this.state.createPassword;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error.code, error.message));

  }

  signIn(event) {
    event.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log(`Logged in as ${success.email}`);
      }), (error) => {
        console.log(error);
      }
  }

  loginPage(event) {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;

      // Get the signed-in user info.
      const user = result.user;
      // ...
    }).catch(function (error) {
      // Error handling goes in here.
      console.log(error)
    });
  }

  // typeIn () {
  //   //function call to make typing happen will have to place into window init function
  //   sort('letter1', 300);
  //   sort('letter2', 800);
    

  //   //function for copying letters in paragragh to array and starting the typing method call
  //   function sort(className, delay) {
  //     let letters1 = $(`.${className}`).text().split('');
  //     $(`.${className}`).text('');
  //     setTimeout(typing, delay, `${className}`, letters1);
  //   }

  //   //function to star pushing characters to be typed
  //   function typing(para, letters) {

  //     function type(input, inputArray) {

  //       $(`.${input}`).append(`<span>${inputArray[index]}</span>`);
  //       index = index + 1;

  //       if (index == inputArray.length) {
  //         //stop call of setInterval Method
  //         clearInterval(interval);
  //       }
  //     }

  //     //variables for tracking
  //     const counter = 0;
  //     var index;

  //     index = counter;
  //     var interval = setInterval(type, 80, para, letters);
  //   }
  // }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
       const dbref = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
        dbref.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            const state = [];
            for (let key in data) {
              state.push(data[key]);
            }
            this.setState({
              loggedIn: true,
              characterName: state,
              newUser: false,       
            });
        });
        
      } else {
        this.setState({ 
          loggedIn: false,
            newUser: true,
          });
      }
    });
  }

  clickFlashlight(){
    if (this.state.flashlight) {
      this.setState({
        flashlight: false,
      });
    } else {
      this.setState({
        flashlight: true,
      });
    }
     let flashlight = this.state.flashlight;
      console.log(flashlight);
      return flashlight;
  }

  // decreasePower() {

  // }

  onOff() {
    let onOff;
    if (this.state.flashlight) {
      onOff = ( <div className="light" > </div>)
    } else {
      onOff = ( <div className="dark" > </div>)
    };

  }

  onOffImg() {
    let onOffImg;
    if (this.state.flashlight) {
      onOffImg = (<img src="../../flashlight-on.png" alt="your flashlight" />)
    } else {
      onOffImg = (<img src="../../flashlight-off.png" alt="your flashlight" />)
    };

  }

  determinPower(){
    i = this.state.batteryLife;
    if (i == 1) {

    }
  }
 
  moveForward(event) {
    // decreasePower();
    event.preventDefault();
    this.setState({
      locationY: this.state.locationY +1,
    });
    console.log(this.state.locationY)
      }
  

  render() {
 
   let location;
    if (this.state.locationX === 1 && this.state.locationY === 1 ) {
      location = ( <div className="background forest"></div>
      )
    } else {
      location = (<div className="background creepyRoom"></div>
      )

    };
    let batteryLife;
    if (this.state.batteryLife === 1) {
      batteryLife = (<div className="batteryLife"> <div className="powerLevel lowBattery"></div></div>
      )
    } else if (this.state.batteryLife === 2){
      batteryLife = (<div className="batteryLife"><div className="powerLevel"></div> <div className="powerLevel"></div>
       </div>
      )
    } else if (this.state.batteryLife === 3) {
      batteryLife = (<div className="batteryLife"><div className="powerLevel"></div><div className="powerLevel"></div> <div className="powerLevel"></div>
      </div>
      )
    } else if (this.state.batteryLife === 4) {
      batteryLife = (<div className="batteryLife"><div className="powerLevel"></div><div className="powerLevel"></div><div className="powerLevel"></div> <div className="powerLevel"></div>
      </div>
      )
    } else {
      batteryLife = (<div className="batteryLife"><div className="powerLevel noBattery"></div>
      </div>
      )

    };
    let overlay;
    let flashlightImg;
    if (this.state.batteryLife >= 1) {
      onOff();
      onOffImg();
    } else {
      flashlightImg = (
        <img src="../../flashlight-off.png" alt="your flashlight" />
      )
      overlay = (
        <div className="dark" > </div> 
      )
    };

    let login;
    let display;
    if (this.state.newUser) {
      display = (
      <div className="new">
      <div className="wrap">
      <div className="flex">
     
              <h1 className="letter1">Hello</h1>
            <h2 className="letter2">Would you tell us your name?</h2>
              {/* {this.typeIn()} */}
        <form onSubmit={(event) => this.addName(event)}>
        <div className="wrap">
        <div className="flex">
        <input className="nameInput" type="text" onChange={(event) => this.handleChange(event, "characterName")} />
          <input className="nameButton"value="Tell Them Your Name" type="submit" />
          </div>
          </div>
        </form>
      </div >
      </div>
      </div>
      )
    } else {
      display = (
        <div className="mainpage">
        <div className="wrap">
        <div className="grid">
              <Game overlay={overlay} moveForward={this.moveForward} location={location} flashlight={this.state.flashlight} />
             
              <User flashlightImg={flashlightImg} flashlight={this.state.flashlight} clickFlashlight={this.clickFlashlight} signOut={this.signOut} characterName={this.state.characterName} battery={this.state.battery} batteryLife={batteryLife} health={this.state.health}/>
        </div>
        </div>
        </div>
      )
    }
    if (this.state.loggedIn === false) {
      login = (
        <div className ="entry">
          <div className="wrap">
          <div className="flex">
          <h1>Turn Out The Lights</h1>
          <img src="../../lamp.gif" alt="a lamp" />
                <form onSubmit={(event) => this.loginPage(event)}>
                <input value="Enter" type="submit" />
          </form>
        {/* <div className="create-user">
            <form onSubmit={(event) => this.createUser(event)}>
              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "createEmail")} />
              <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "createPassword")} />
              <button>Create User</button>
            </form>
          </div> */}
          {/* <form onSubmit={(event) => this.signIn(event)}>
            <input type="text" placeholder="Please enter your e-mail address" onChange={(event) => this.handleChange(event, "loginEmail")} />
            <input type="password" placeholder="Please enter your desired password" onChange={(event) => this.handleChange(event, "loginPassword")} />
            <button>Login</button>
          </form> */}
        </div>
        </div>
        </div>
      )
    } else{
      login = (
        display
      )
    } 
    

    


    return (
      <div className="main">

      {login}
        {/* {this.state.loggedIn ? loggedIn : loggedOut } */}
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
// class Login extends React.Component {

//   login(e) {
//     e.preventDefault();
//     console.log('hello');
    
//     firebase.initializeApp(config);
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ...

//       firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//           // User is signed in.
//           var displayName = user.displayName;
//           var email = user.email;
//           var emailVerified = user.emailVerified;
//           var photoURL = user.photoURL;
//           var isAnonymous = user.isAnonymous;
//           var uid = user.uid;
//           var providerData = user.providerData;
//           // ...
//         } else {
//           // User is signed out.
//           // ...
//         }
//       });

//     });
//   }
//   render() {
//     return (
//       <div>
//         <form  onSubmit={this.login} className="login">
//           <input type="submit" className="enter"/>
//         </form>
         
//       </div>
//     )
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <h1>hewwo</h1>
//         <input className="text" /> <button className="button">i'm a button</button>
//       </div>
//       )
//   }
// }

// class Right extends React.Component {
//   render() {
//     return (
//       <div className="right">
//         <h1>it was the right of sides</h1>
//       </div>
//     )
//   }
// }

// class Left extends React.Component {
//   render() {
//     return (
//       <div className="left">
//         <h1>it was the left of sides</h1>
//         <img src="../../battery.png" alt="a battery" />
//         <img src="../../flashlight-on.png" alt="your flashlight" />
//       </div>
//     )
//   }
// }

// class User extends React.Component {
//   render() {
//     return (
//       <div className="user">
//         <h2>anyone there</h2>
//       </div>
//     )
//   }
// }
// class App extends React.Component {
//   constructor() {
//     super();
//   }

  // login(e) {
  //   e.preventDefault(); 
  //   firebase.auth().signInWithPopup(provider).then(function (result) {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     // ...
  //   }).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
  // }  

//   configure(e) {

//     GoogleSignin.configure({
      
// })
// .then(() => {
//           // you can now call currentUserAsync()
//         });
//   }

// componentDidMount(){
//   GoogleSignin.currentUserAsync().then((user) => {
//     console.log('USER', user);
//     this.setState({ user: user });
//   }).done();
//   const user = GoogleSignin.currentUser();
// // user is null if not signed in

//   GoogleSignin.signIn()
//     .then((user) => {
//       console.log(user);
//       this.setState({ user: user });
//     })
//     .catch((err) => {
//       `consol`e.log('WRONG SIGNIN', err);
//     })
//     .done();

//   GoogleSignin.getAccessToken()
//     .then((token) => {
//       console.log(token);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .done();

//   GoogleSignin.signOut()
//     .then(() => {
//       console.log('out');
//     })
//     .catch((err) => {

//     });
// }
//     render() {
//       return (
//         <div className="grid">
//           <GoogleSigninButton
//             style={{ width: 48, height: 48 }}
//             size={GoogleSigninButton.Size.Standard}
//             color={GoogleSigninButton.Color.Dark}
//             onPress={this._signIn.bind(this)} />
//           <form className="login" onSubmit={this.login.bind(this)}>
//             <input type="submit" />
//           </form>
//           {/* <Left />
//           <Game />
//           <Right />
//           <User /> */}
//         </div>
//       )
//     }
// }
