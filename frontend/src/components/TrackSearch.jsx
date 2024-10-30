import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const TrackSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 0) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/search/tracks?query=${query}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]); // Clear suggestions if the query is empty
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce for 300ms

        return () => clearTimeout(debounceFetch); // Cleanup on unmount or when query changes
    }, [query]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            setIsModalOpen(true); // Open the modal for empty input
            return; // Prevent further execution
        }
        try {
            const response = await axios.get(`http://localhost:8000/api/search/tracks?query=${query}`);
            setResults(response.data);
            setSuggestions([]); // Clear suggestions after search
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div>
        <form onSubmit={handleSearch}>
        <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search tracks..."
        />
        <button type="submit">Search</button>
        </form>
        {suggestions.length > 0 && (
            <ul>
                {suggestions.map(track => (
                    <li key={track._id}>{track.title} by {track.artist}</li>
                ))}
            </ul>
        )}
        <ul>
        {results.map(track => (
            <li key={track._id}>{track.title} by {track.artist}</li>
        ))}
        </ul>
        <Modal isOpen={isModalOpen} onClose={closeModal} message="Search for a music." />
        </div>
    );
};

export default TrackSearch;
