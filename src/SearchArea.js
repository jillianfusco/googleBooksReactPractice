import React from 'react';

const SearchArea = (props) => {
    return (
        <div className="search-container">
            <form onSubmit={props.searchBook} action="">
                <input className="search-bar" onChange={props.handleSearch} type="text"/>
                <button className="button" type="submit">Search</button>
                <select defaultValue="Sort" onChange={props.handleSort}>
                    <option disabled value="Sort">Sort</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </form>
        </div>
    )
}

export default SearchArea;