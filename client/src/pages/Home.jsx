import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
    const [sets, setSets] = useState([]);

    useEffect(() => {
        const getSets =  async () => {
            axios.get('http://localhost:5000/get/sets', {params: {userId: 1}}).then(res => { 
                setSets(res.data);
            }).catch((err) => {
            console.log(err)
            })
        }
        getSets()
    }, []);

    let cardButtons = [
        {
            text: "Play",
            onClick: ""
        }
    ]

  return (
    <div>
        <div className='flex flex-wrap space-around margin-v'>
        {
           sets && sets.map((set, i) => {
            return (
                <Card key={i} buttons={cardButtons} id={set.id} title={set.setName}/>
            )
           }) 
        }
         </div>
    </div>
  )
}

export default Home