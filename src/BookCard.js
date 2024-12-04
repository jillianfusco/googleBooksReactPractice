import React from 'react';
import React, { useState } from 'react';

const BookCard = (props) => {
    return (
        <div className="card-container">
           <img src={props.image} alt="book cover"/>
           <div className="desc">           
                <h2>{props.title}</h2>
                <h3>Author: {props.author}</h3>                
                <p>Published Date: {props.published === '0000' ? "Not available" : props.published.substring(0, 4)}</p>
           </div>
           <button className="button">Add to TBR</button>
        </div>


    )
}

export default BookCard;