import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const MySet  = ({setNavbar}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [sets, setSets] = useState([]);
    const [newSet, setNewSet] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
      setNavbar(true)
  });
    
    useEffect(() => {
      const getSets =  async () => {
        axios.get('http://localhost:5000/get/mysets').then(res => { 
          setSets(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
      getSets()
    }, [newSet]);

    const deleteSet = (e) => {
      const id = e.target.id
      axios.delete('http://localhost:5000/delete/set', {params: {id:id}}).then(res => {
        setSets(res.data)
      })
    }

    const goToEdit = (e) => {
      const id = e.target.id;

      navigate(`/sets/${id}`);
    }


    let cardButtons = [
      {
        text: "Add",
        onClick: goToEdit
      },
      {
        text: "Edit",
        onClick: "",
      },
      {
        text: "Delete",
        onClick: deleteSet,
      }
    ]

  return (
    <div className='flex-center-h'>
        <form 
        onSubmit={handleSubmit((data) => {
            axios.post('http://localhost:5000/set/create', data).then(res => {
              setNewSet(res.data)
            }).catch((err) => {
              console.log(err)
            })
        })} 
        method='POST'
        >
            <input {...register("name", {required: "This field is required"})} type="text" placeholder='Enter set name here' />
            <p style={{ color: "red" }}>{errors.name?.message}</p>
            <button type='submit'>Add</button>
        </form>

        <div className='flex flex-wrap space-around margin-v'>
          {
            sets && sets.map((set,i) => {
              return (
                <Card key={i} buttons={cardButtons} id={set.id} title={set.setName}/>
              )
              
            })
          }
        </div>
    </div>
  )
}

export default MySet