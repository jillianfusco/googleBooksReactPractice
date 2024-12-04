import React, { useState } from 'react';
import SearchArea from './SearchArea';
import BookList from './BookList';
import './App.css';
// import React, { Component } from 'react'; 
// import request from 'superagent';


const Books = () => {
    //state variables
    const [books, setBooks] = useState([]); //store fetched books
    const [searchField, setSearchField] = useState(''); //search input
    const [sort, setSort] = useState(''); //sorting preference
    const [addedBooks, setAddedBooks] = useState([]); //books added to TBR

    //fetch books from api
    const searchBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchField}`);
            const data = await response.json();
            const cleanedData = cleanData(data.items);
            setBooks(cleanedData);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    //clean fetched book data
    const cleanData = (data) => {
        const cleanedData = data.map((book) => {
            // Ensure volumeInfo exists
            const volumeInfo = book.volumeInfo || {};
    
            // Ensure publishedDate exists
            if (!volumeInfo.hasOwnProperty('publishedDate')) {
                volumeInfo['publishedDate'] = '0000';
            }
    
            // Ensure imageLinks exists with a default thumbnail
            if (!volumeInfo.hasOwnProperty('imageLinks')) {
                volumeInfo['imageLinks'] = {
                    thumbnail: 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337',
                };
            }
    
            return {
                title: volumeInfo.title || 'No Title',
                author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
                publishedDate: volumeInfo.publishedDate,
                image: volumeInfo.imageLinks.thumbnail,
            };
        });
    
        return cleanedData;
    };
    
    

    //add book to TBR
    const addToTBR = (book) => {
        setAddedBooks([...addedBooks, book]);
    };

    //send TBR books to backend
    const sendBooksToBackend = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addedBooks),
            });
            if (response.ok) {
                console.log( 'Books sucessfully sent to backend');
            } else {
                console.error('Failed to send books:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending books:', error);
        }
    };

    return (
        <div>
            <SearchArea 
             searchBook={searchBook}
             handleSearch={(e) => setSearchField(e.target.value)}
             handleSort={(e) => setSort(e.target.value)}
            />
             <button onClick={sendBooksToBackend}>Send TBR to Backend</button>
            <BookList books={books.sort((a, b) => {
                if (sort === 'Newest') return parseInt(b.publishedDate) - parseInt(a.publishedDate);
                if (sort === 'Oldest') return parseInt(a.publishedDate) - parseInt(b.publishedDate);
                return 0;
            })} addToTBR={addToTBR} />
        </div>
    );
};

export default Books;

// class Books extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             books: [],
//             searchField: '',
//             sort: ''
//         }
//     }    

//     searchBook = (e) => {
//         e.preventDefault();
//         request
//             .get("https://www.googleapis.com/books/v1/volumes?")
//             .query({ q: this.state.searchField })
//             .then((data) => {
//                 console.log(data);
//                 const cleanData = this.cleanData(data)
//                 this.setState({ books: cleanData })
//             })
//     }

//     handleSearch = (e) => {
//         console.log(e.target.value);
//         this.setState({ searchField: e.target.value })
//     }

//     handleSort = (e) => {
//         console.log(e.target.value)
//         this.setState({ sort: e.target.value })
//     }

//     cleanData = (data) => {
//         const cleanedData = data.body.items.map((book) => {
//             if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
//                 book.volumeInfo['publishedDate'] = '0000';
//             }

//             else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
//                 book.volumeInfo['imageLinks'] = { thumbnail: 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337' }
//             }

//             return book;
//         })

//         return cleanedData;
//     }

//     render(){
//         const sortedBooks = this.state.books.sort((a, b) => {
//             if(this.state.sort === 'Newest') {
//                 return parseInt(b.volumeInfo.publishedDate.substring(0,4)) - parseInt(a.volumeInfo.publishedDate.substring(0,4)) //parseInt converts string to intger so it can sort
//             }
//             else if (this.state.sort === 'Oldest') {
//                 return parseInt(a.volumeInfo.publishedDate.substring(0,4)) - parseInt(b.volumeInfo.publishedDate.substring(0,4))
//             }
//            return 0;
//         })
//         return (
//         <div>
//             <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} handleSort={this.handleSort}/>
//             <BookList books={sortedBooks} />
            
//         </div>
//         );
//     }
// }

// export default Books;
