import React, { useState } from 'react';
import axios from 'axios';

const SearchByDate = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/items?startDate=${startDate}&endDate=${endDate}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
            />
            <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((item, index) => (
                <li key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>{item.date}</p>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchByDate;