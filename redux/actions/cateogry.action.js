import { categoryConstant } from "../constants";

export const cateogryAction = {
  viewCateogry
};

function viewCateogry(skill) {
  return dispatch => {
    db.collection("Users")
      .where(`skills.${skill}`, "==", true)
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot)
      })
      .catch(function(error) {
        console.log(error);
      });
  };

/*   function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  } */
}
