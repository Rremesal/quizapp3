import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FillSet = ({}) => {
  
  const {register, handleSubmit, formState: {errors}} = useForm();
  const params = useParams();

  const submit = (data) => {
    const formData = new FormData();
    formData.append("file", data.fileSelect[0]);
    formData.append("setId",params.id)
    formData.append("userId", 1)
    axios.post("http://localhost:5000/convert/csv", formData).then(res => {
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} method='POST'>
        <input {...register("fileSelect")} type="file" accept=".csv"/>
        <button type='submit'>Upload</button>
      </form>
    </div>
    
  )
}

export default FillSet