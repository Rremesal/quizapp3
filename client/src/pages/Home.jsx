import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [sets, setSets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSets =  async () => {
            axios.get('http://localhost:5000/get/sets').then(res => { 
                setSets(res.data);
            }).catch((err) => {
            console.log(err)
            })
        }
        getSets()
    }, []);

    const goToPlay = (e) => {
        const username = localStorage.getItem("user");
        const setId = e.target.id;
        navigate(`play/${setId}/${username}`);
    }

    let cardButtons = [
        {
            text: "Play",
            onClick: goToPlay
        }
    ];

  return (
    <div>
        <div className='flex flex-wrap space-around margin-v'>
        {
           sets && sets.map((set, i) => {
            return (
                <Card key={i} buttons={cardButtons} title={set.setName} id={set.id} data={set.userId}/>
            )
           }) 
        }
         </div>
    </div>
  )
}

export default Home