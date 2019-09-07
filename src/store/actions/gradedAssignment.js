
import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getGradedASNTListStart = () => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_START
  };
};

export const getGradedASNTListSuccess = assignments => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_SUCCESS,
    assignments
  };
};

export const getGradedASNTListFail = error => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_SUCCESS,
    error: error
  };
};

export const getGradedASNTS=(token,username)=>{
    return dispatch=>{
        dispatch(getGradedASNTListStart())
        axios.defaults.headers={
            "Content-type":"application/json",
            Authorization:`Token ${token}`

        };
        axios
        .get(`http://localhost:8000/graded-assignments/?username=${username}`)
        .then(res=>{
            const assignments=res.data
            dispatch(getGradedASNTListSuccess(assignments))
        })
        .catch(err=>{
            dispatch(getGradedASNTListFail(err))
        })
    }
}
export const createGradedASNT = (token, asnt) => {
  return dispatch => {
    // dispatch(createASNTStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://localhost:8000/graded-assignments/create/`, asnt)
      .then(res => {
        // dispatch(createASNTSuccess());
        console.log('Success')
      })
      .catch(err => {
        // dispatch(createASNTFail());
      });
  };
};