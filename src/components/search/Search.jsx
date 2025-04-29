import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchRequest } from '../../redux/charactersSlice';
import { FaSearch } from 'react-icons/fa';


const Search = () => {
    const dispatch = useDispatch();
    const { searchRequest } = useSelector((state) => state.characters);

    return (
        <div className="search-form">
            <div className="search-icon">
                <FaSearch style={{ color: 'white' }} />
            </div>
            <input
                onChange={(e) => dispatch(setSearchRequest(e.target.value))}
                value={searchRequest}
                type="text"
                className="search-input"
                placeholder="Search..."
            />
        </div>
    )
}

export default Search;