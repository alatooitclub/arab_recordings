import React, { useState } from 'react';
import axios from 'axios';

const SearchByWord = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
        const response = await axios.get(`/api/words?q=${query}`);
        setResults(response.data);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    return ( 
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((word, index) => (
                <li key={index}>
                    <h3>{word.name}</h3>
                    <p>{word.description}</p>
                </li>
                ))}
            </ul>
        </div>
     );
}
 
export default SearchByWord;