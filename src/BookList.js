import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, addToTBR }) => {
    return (
        <div className="container">
            {books.map((book, index) => (
                <BookCard
                    key={index}
                    book={book} // Pass the entire cleaned book object
                    addToTBR={addToTBR} // Function to handle adding to TBR
                />
            ))}
        </div>
    );
};

export default BookList;


// import React from 'react';
// import BookCard from './BookCard';

// const BookList = (props) => {
//     return (
//         <div className="container">
//             {
//                 props.books.map((book, i) => {
//                     return <BookCard 
//                              key={i}
//                              image={book.volumeInfo.imageLinks.thumbnail}
//                              title={book.volumeInfo.title}
//                              author={book.volumeInfo.authors}
//                              published={book.volumeInfo.publishedDate}
//                              />
//                 })
//             }
//         </div>  


//     )
// }

// export default BookList;