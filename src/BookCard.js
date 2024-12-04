import React from 'react';

const BookCard = ({ book, addToTBR }) => {
    const handleAddToTBR = () => {
        addToTBR(book); // Add book to TBR
    };

    return (
        <div className="card-container">
            <img src={book.image} alt={`${book.title} cover`} />
            <div className="desc">
                <h2>{book.title}</h2>
                <h3>Author: {book.author}</h3>
                <p>Published Date: {book.publishedDate === '0000' ? 'Not available' : book.publishedDate}</p>
            </div>
            <button className="button" onClick={handleAddToTBR}>Add to TBR</button>
        </div>
    );
};

export default BookCard;



// import React from 'react';
// import React, { useState } from 'react';

// const BookCard = (props) => {
//     return (
//         <div className="card-container">
//            <img src={props.image} alt="book cover"/>
//            <div className="desc">           
//                 <h2>{props.title}</h2>
//                 <h3>Author: {props.author}</h3>                
//                 <p>Published Date: {props.published === '0000' ? "Not available" : props.published.substring(0, 4)}</p>
//            </div>
//            <button className="button">Add to TBR</button>
//         </div>


//     )
// }

// export default BookCard;