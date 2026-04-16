import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"

const App = () => {


  let [formData , setFormData] = useState({})
  let [user , setUser] = useState([])

  let getUser = async()=>{
    try {
      let res = await axios.get("http://localhost:3000/users")
      setUser(res.data.user)
    } catch (error) {
      console.log("Error in fetching")
    }
  }

  // useEffect(()=>{
  //   getUser()
  // }, [])

  let handleSubmit = async (e)=>{

    try {
    // console.log(formData)
    e.preventDefault();
    e.target.reset()
    let res =  await axios.post("http://localhost:3000/register" , formData , {withCredentials:true})
    console.log(res);

    

    } catch (error) {
      console.log("error in data submition ")
    }
  }
  

  let handleChange = (e)=>{

    let {name,value} = e.target
    setFormData({...formData , [name]:value })
    
  }
  // console.log(formData)

  let handleLoginForm =async (e)=>{
    try {
      e.preventDefault()
      let res = await axios.post("http://localhost:3000/login" , formData , {withCredentials:true})
    } catch (error) {
      console.log("Error in login form")
    }
  }
  
  return (
    <div>
    <h1>Registeration Form</h1>

     <form onSubmit={handleSubmit} >

      <input onChange={handleChange} name='name'  type="text" placeholder='Enter name' /> <br /> <br />
      <input onChange={handleChange} name='email' type="text" placeholder='Enter email' /> <br /> <br />
      <input onChange={handleChange} name='password' type="text" placeholder='Enter password' /><br /> <br />
      <input onChange={handleChange} name='mobile' type="number" placeholder='Enter mobile' /> <br /> <br />

      <button>Submit</button>
     </form>

     <h1>Login Form</h1>

     <form onSubmit={handleLoginForm} >

      <input onChange={handleChange} name='email' type="text" placeholder='Enter email' /> <br /> <br />
      <input onChange={handleChange} name='password' type="text" placeholder='Enter password' /><br /> <br />

      <button>Submit</button>
     </form>

    </div>
  )
}

export default App
