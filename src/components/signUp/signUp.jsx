import React, { useState } from 'react'

const signUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };




  return (
    <div>signUp</div>
  )
}

export default signUp