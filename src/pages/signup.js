import React, { useState } from "react";
import Axios from "axios";
// import "../../App";


export default function Signup(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  Axios.defaults.withCredentials = true; //working with cookies

  const signUp = async(e) => {
    console.log("sign up function ran")
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:3002/register/", 
        {username: username, password: password},
        {withCredentials: true}
      );
      console.log("Response:", response.data); // Log response from server
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }

  };


  return (
    <div className = "flex flex-col justify-center items-center pt-[100px] w-full max-w-[500px] mx-auto">
      <form className = "flex flex-col items-center justify-between w-[90%] p-[25px] bg-white rounded-lg shadow-lg">

        <div className = "flex flex-col gap-2.5 w-full items-center">
          <input 
            className = "login-form-inputs"
            type = "text" 
            placeholder = "Username" 
            id = "username-email"
            onChange = {(e) => {
              setUsername(e.target.value);
            }} 
          /> 

          <input 
            className = "login-form-inputs"
            type = "password" 
            placeholder = "Password" 
            id = "password"
            onChange = {(e) => {
              setPassword(e.target.value);
            }} 
          /> 
        </div>

        <p className = "h-6 text-red-600 text-center leading-tight">{loginErrorMessage}</p>

        <button 
          className = "w-52 px-16 py-2 mt-5 bg-blue-500 text-center text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick = {signUp}
        >
          Sign Up
        </button>

      </form>
    </div>
  )
}