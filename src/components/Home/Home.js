import React, { useEffect, useState } from 'react';
import Events from '../Events/Events';

const Home = () => {
    const [events,setEvents]= useState([]);
    useEffect(()=>{
        fetch('https://morning-cliffs-60598.herokuapp.com/events')
        .then(res=>res.json())
        .then(data=>setEvents(data))
    },[])
    return (
        <div className="container">
            <div className="row">
                {
                    events.map(event=> <Events event={event} key={event._id} />)
                }
            </div>
        </div>
    );
};

export default Home;