import { authConstants, categoryConstant } from "../constants";
import firebase from "firebase";
import CreateCircle from "../../Screens/CreateCircle";
require("firebase/firestore");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBekObSgnoKhXXJbvesxXrDBsL3qVvx2f8",
  authDomain: "workout-01.firebaseapp.com",
  databaseURL: "https://workout-01.firebaseio.com",
  projectId: "workout-01",
  storageBucket: "workout-01.appspot.com",
  messagingSenderId: "566464704593"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
var db = firebase.firestore();

export const authActions = {
  register,
  login,
  loginFacebook,
  createCircle,
  getcircles,
  currentCircle,
  JoinCircle,
  updateLocation
};

function updateLocation(location, id, code) {
  console.warn(location, id, code);
  return dispatch => {
    db.collection("Circles")
      .doc(code)
      .collection("users")
      .where("id", "==", id)
      .set({
        location: location
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });

    // doc.data() is never undefined for query doc snapshots
  };
}

function JoinCircle(code, user, location) {
  return dispatch => {
    db.collection("Circles")
      .doc(code)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          db.collection("Circles")
            .doc(code)
            .collection("users")
            .add({
              name: user.name,
              id: user.id,
              picture: user.picture,
              location: location
            })
            .then(function() {
              console.log("Document successfully written!");
              const obj = {
                circleName: doc.data().circleName,
                code: doc.data().code
              };
              dispatch(success(obj));
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };
  function success(circle) {
    return { type: authConstants.CIRCLE_INFO, circle };
  }
}

function currentCircle(code) {
  return dispatch => {
    dispatch(success1(code));

    const data = [];
    db.collection("Circles")
      .doc(code)
      .collection("users")
      .get()
      .then(response => {
        response.forEach(res => {
          data.push(res.data());
        });
        dispatch(success(data));
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(data) {
    return { type: authConstants.CURRENT_CIRCLE, data };
  }
  function success1(data) {
    return { type: authConstants.VIEW_CIRCLE, data };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}
function getcircles(userId) {
  console.log("sdadsa");
  return dispatch => {
    const Circles = [];
    db.collection("Circles")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          db.collection("Circles")
            .doc(doc.id)
            .collection("users")
            .where("id", "==", userId)
            .get()
            .then(response => {
              response.forEach(res => {
                console.log("***********************", res.id);
                if (res.exists) {
                  db.collection("Circles")
                    .doc(doc.id)
                    .onSnapshot(data => {
                      console.log(data.data());
                      Circles.push(data.data());
                      dispatch(success(Circles));
                    });
                }
              });
            });

          // doc.data() is never undefined for query doc snapshots
        });
      })

      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(data) {
    return { type: authConstants.YOUR_CIRCLES, data };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}
function createCircle(name, code, user, location) {
  return dispatch => {
    db.collection("Circles")
      .doc(code)
      .set({
        circleName: name,
        code: code,
        admin: user
      })
      .then(function() {
        console.log("Document written with ID");
        db.collection("Circles")
          .doc(code)
          .collection("users")
          .add({
            name: user.name,
            id: user.id,
            picture: user.picture,
            location: location
          });

        console.log("Your Work Has Been Done Succesfully");

        const obj = {
          circleName: name,
          code: code
        };
        dispatch(success(obj));
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(circle) {
    return { type: authConstants.CIRCLE_INFO, circle };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function loginFacebook(user) {
  return dispatch => {
    db.collection("Users")
      .doc(user.id)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          dispatch(success(doc.data()));
        } else {
          // doc.data() will be undefined in this case

          console.log("Hello!");
          db.collection("Users")
            .doc(user.id)
            .set({
              id: user.id,
              name: user.name,
              picture: user.picture
            })
            .then(res => {
              dispatch(success(user));
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    function request(user) {
      return { type: authConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
      return { type: authConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: authConstants.LOGIN_FAILURE, error };
    }
  };
}

function login(email, password) {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        db.collection("Users")
          .doc(res.user.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              dispatch(success(doc.data()));
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function register(email, password, name) {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user);
        db.collection("Users")
          .doc(res.user.uid)
          .set({
            name: name,
            email: res.user.email
          })
          .then(() => {
            dispatch(success(res.user));
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}
