import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentBar, setBarName } from '../store/actions/barsActions';
import { setCurrentGameId, setBar, setPlayersNames } from '../store/actions/liveGameActions';
import axios from 'axios';

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [barCreated, setBarCreated] = useState(false);

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
            if (barCreated) return; // Prevent re-creation of the bar

            try {
                let barResponse;

                // Check if the bar exists
                try {
                    barResponse = await axios.get('https://getloose-server.onrender.com/api/bar/Admin');
                    console.log('Bar already exists:', barResponse.data);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log('Bar does not exist. Creating a new bar...');

                        // Fetch all packages
                        const packagesResponse = await axios.get('https://getloose-server.onrender.com/api/packages');
                        const allPackages = packagesResponse.data;
                        const packageIds = allPackages.map(pkg => pkg._id);

                        console.log('Package IDs:', packageIds);

                        // Define the new bar
                        const newBar = {
                            barName: "Admin",
                            location: {
                                type: "Point",
                                coordinates: [100, 100] // Longitude, Latitude
                            },
                            capacity: 1000,
                            barPackages: packageIds,
                            qrUrl: "https://getloose.onrender.com/Admin"
                        };

                        console.log('Creating bar with payload:', newBar);

                        // Create the new bar
                        barResponse = await axios.post('https://getloose-server.onrender.com/api/bar/create', newBar);
                        console.log('New bar created:', barResponse.data);

                        setBarCreated(true); // Set the flag to prevent re-creation
                    } else {
                        console.error('Error checking bar existence:', error);
                        return;
                    }
                }

                const barInfo = barResponse.data;
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
                navigate('/NewHomePage');
                console.log('Navigating to the first page...');
            } catch (error) {
                console.error('Error fetching bar information:', error);
                // Handle error (e.g., show a message or redirect to an error page)
            }
        };

        fetchBarInfoAndSetupGame();
    }, [dispatch, navigate, barCreated]);

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};

export default Admin;
