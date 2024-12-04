import React, { Component } from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';
import './App.css';

class Books extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            searchField: '',
            sort: ''
        }
    }

    searchBook = (e) => {
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes?")
            .query({ q: this.state.searchField })
            .then((data) => {
                console.log(data);
                const cleanData = this.cleanData(data)
                this.setState({ books: cleanData })
            })
    }

    handleSearch = (e) => {
        console.log(e.target.value);
        this.setState({ searchField: e.target.value })
    }

    handleSort = (e) => {
        console.log(e.target.value)
        this.setState({ sort: e.target.value })
    }

    cleanData = (data) => {
        const cleanedData = data.body.items.map((book) => {
            if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                book.volumeInfo['publishedDate'] = '0000';
            }

            else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                book.volumeInfo['imageLinks'] = { thumbnail: 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337' }
            }

            return book;
        })

        return cleanedData;
    }

    render(){
        const sortedBooks = this.state.books.sort((a, b) => {
            if(this.state.sort === 'Newest') {
                return parseInt(b.volumeInfo.publishedDate.substring(0,4)) - parseInt(a.volumeInfo.publishedDate.substring(0,4)) //parseInt converts string to intger so it can sort
            }
            else if (this.state.sort === 'Oldest') {
                return parseInt(a.volumeInfo.publishedDate.substring(0,4)) - parseInt(b.volumeInfo.publishedDate.substring(0,4))
            }
           return 0;
        })
        return (
        <div>
            <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} handleSort={this.handleSort}/>
            <BookList books={sortedBooks} />
            
        </div>
        );
    }
}

export default Books;
