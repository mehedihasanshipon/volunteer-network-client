import React from 'react';

const Events = ({event}) => {

    const deleteEvent = (id)=>{
        console.log(id);
        fetch(`http://localhost:3002/deleteEvent/${id}`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                // event.target.parentNode.style.display = "none";
                console.log("Deleted");
            }
        })
    }
    // console.log(event);
    return (
        <div className="col-lg-3 col-md-6 col-xs-8">
            <img src={event.images} className="img-fluid" style={{height:'300px'}} alt=""/>
            <h4>This is events in home <button onClick={()=>deleteEvent(event._id)}>Delete</button> </h4>
        </div>
    );
};

export default Events;