import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentBar, setBarName } from '../store/actions/barsActions';
import { setCurrentGameId, setBar, setPlayersNames } from '../store/actions/liveGameActions';
import axios from 'axios';

const TheRustyAnchor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to fetch the device's IP address
    const getDeviceIp = async () => {
        try {
            console.log('Fetching device IP...');
            const response = await axios.get('https://api.ipify.org?format=json');
            console.log('Device IP fetched:', response.data.ip);
            return response.data.ip;
        } catch (error) {
            console.error('Error fetching device IP:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchBarInfoAndSetupGame = async () => {
            try {
                console.log('Fetching bar information for The Rusty Anchor...');
                const response = await axios.get('https://getloose-server.onrender.com/api/bar/The%20Rusty%20Anchor');
                const barInfo = response.data;
                console.log('Bar information fetched:', barInfo);

                // Dispatch the bar information to the Redux store
                dispatch(setCurrentBar(barInfo));
                dispatch(setBarName(barInfo.barName));
                console.log('Dispatched bar information to store:', barInfo);

                // Fetch the device's IP address
                const deviceId = await getDeviceIp();

                if (!deviceId) {
                    console.error('Failed to retrieve device IP.');
                    return;
                }

                // Set up the live game with the bar name and device ID
                const liveGame = {
                    bar: barInfo.barName,
                    playersNames: [deviceId],  // Using the IP address as the device ID
                };
                console.log('Setting up live game:', liveGame);

                dispatch(setBar(barInfo.barName));
                dispatch(setPlayersNames([deviceId]));
                dispatch(setCurrentGameId(null)); // If you want to set a new game ID, fetch it from the backend or generate it

                console.log('Dispatched live game to store:', liveGame);

                // Redirect to the first page for choosing between Date or Friends
                navigate('/');
                console.log('Navigating to the first page...');
            } catch (error) {
                console.error('Error fetching bar information:', error);
                // Handle error (e.g., show a message or redirect to an error page)
            }
        };

        fetchBarInfoAndSetupGame();
    }, [dispatch, navigate]);

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};

export default TheRustyAnchor;
