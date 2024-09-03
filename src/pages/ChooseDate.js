import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame, setCurrentGameId } from '../store/actions/liveGameActions';
import { TextField, Button, Box, Typography, Card, CardContent, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChooseDate.css'; // Import the CSS file

const ChooseDate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tableName, setTableName] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null); // Only one selected package
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [fullPackages, setFullPackages] = useState([]);

    const currentBar = useSelector(state => state.bars.currentBar);
    const barPackageIds = currentBar?.barPackages || [];
    const playersNames = useSelector(state => state.liveGames.playersNames || []);
    const tableNumber = useSelector(state => state.liveGames.tableNumber || 0);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const fetchedPackages = await Promise.all(
                    barPackageIds.map(async (pkgId) => {
                        const response = await axios.get(`http://localhost:3001/api/package/${pkgId}`);
                        var DataToReturn={
                            _id:pkgId,
                            ...response.data,
                        }
                        return DataToReturn;
                    })
                );
                setFullPackages(fetchedPackages);
            } catch (err) {
                setError('Failed to fetch packages');
                console.error('Error fetching packages:', err);
            }
        };

        if (barPackageIds.length > 0) {
            fetchPackages();
        }
    }, [barPackageIds]);

    const handleNameChange = (event) => {
        setTableName(event.target.value);
    };

    const handlePackageChange = (pkg) => {
        console.log(pkg._id);
        if(selectedPackage==null)
            {
                setSelectedPackage(pkg);
            }
       else if(pkg._id===selectedPackage._id)
            {
                setSelectedPackage(null);
            }
        else
            {
                setSelectedPackage(pkg);
            }
        // Set the selected package to the clicked package
        
    };

    const handleCreateLiveGame = () => {
        if (selectedPackage && tableName) {
            const liveGame = {
                gameType: 'Date',
                bar: currentBar._id,
                tableName: tableName,
                tableNumber: tableNumber,
                package: selectedPackage._id,
                playersNames: playersNames,
            };

            console.log('Creating Live Game with:', liveGame);

            dispatch(createLiveGame(liveGame))
                .then(response => {
                    alert(response._id);
                    // Assuming response.data contains the live game object
                    const liveGameResponse = response || {};
                    const newGameId = liveGameResponse._id;

                    if (newGameId) {
                        dispatch(setCurrentGameId(newGameId));
                        setSuccessMessage('Live game created successfully!');
                        navigate('/WaitingForApproval');
                    } else {
                        setError('Unexpected response format.');
                        console.error('Unexpected response format:', liveGameResponse);
                    }
                })
                .catch((err) => {
                    setError('Failed to create live game');
                    console.error('Error creating live game:', err);
                });
        } else {
            setError('Please select a package and enter a table name.');
        }
    };

    return (
        <div className="choose-date-container">
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        
        {!currentBar?._id ? (
            <Typography>No bar selected or data unavailable</Typography>
        ) : (
            <Box className="choose-date-content">
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Enter Table Name
                    </Typography>
                    <TextField
                        label="Table Name"
                        value={tableName || ''}  // Ensure value is always a string
                        onChange={handleNameChange}
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                </Box>

                <Box className="choose-package-list">
                    {fullPackages.length > 0 ? (
                        <Box className="package-list">
                            <Typography variant="h6" gutterBottom align='center'>
                                Select a Package:
                            </Typography><br/>
                            {fullPackages.map(pkg => (
                                <Card
                                    key={pkg._id}
                                    className={`package-card ${selectedPackage && selectedPackage._id === pkg._id ? 'selected' : ''}`}
                                    onClick={() => handlePackageChange(pkg)}
                                    sx={{
                                        marginBottom: 2, // Space between cards
                                        cursor: 'pointer', // Pointer cursor on hover
                                        border: selectedPackage && selectedPackage._id === pkg._id ? '2px solid #1976d2' : '1px solid #ccc', // Highlight selected card
                                        transition: 'border 0.3s ease', // Smooth transition for border change
                                        padding: 2 // Ensure padding within card
                                    }}
                                >
                                    <CardContent className="package-card-content">
                                        <Typography variant="h6" component="div" gutterBottom>
                                            ${pkg.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {pkg.packagesContant}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No packages available for this bar</Typography>
                    )}
                </Box>

                <Box className="create-game-button" sx={{ marginTop: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateLiveGame}
                        disabled={!selectedPackage || !tableName}
                    >
                        Create Live Game
                    </Button>
                </Box>
            </Box>
        )}
    </div>
    );
};

export default ChooseDate;
