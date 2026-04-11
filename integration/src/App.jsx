import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

  let [formData , setFormData] = useState({})
  let [users , setUsers] = useState([])

  let getUser = async ()=>{
    try {
      let res = await axios.get("http://localhost:3000/users")
      setUsers(res.data.users)
    } catch (error) {
      console.log("Error in get users ->" , error)
    }
  }

  useEffect(()=>{
    getUser()
  } , [])

  let handleFormSubmit = async (e)=>{
    try {
      e.preventDefault();
      console.log(formData);
      
      let res = await axios.post("http://localhost:3000/register" , formData)
      console.log(res)

    } catch (error) {
      console.log("Error in api -> " , error)
    }
  }

  let handleChange = (e)=>{
    let {name,value} = e.target;
    setFormData({...formData , [name]:value})
  }


  return (
    <div className='form' >
      <form onSubmit={handleFormSubmit} >
        <input onChange={handleChange} name='name'   type="text" placeholder='Enter name' /> <br /> <br />
        <input onChange={handleChange} name='email' type="text" placeholder='Enter email' /> <br /><br />
        <input onChange={handleChange} name='password' type="text" placeholder='Enter password' /><br /><br />
        <input onChange={handleChange} name='mobile' type="text" placeholder='Enter mobile' /> <br /><br />

        <button>create</button>
      </form>


      <div>
        {
          users.map((elem , indx)=>{
            return <div className='main' >
              <h1>{elem.name}</h1>
              <h1>{elem.email}</h1>
              <h1>{elem.password}</h1>
              <h1>{elem.mobile}</h1>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
