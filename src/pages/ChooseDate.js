import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame, setCurrentGameId } from '../store/actions/liveGameActions';
import { TextField, Button, Box, Typography, Card, CardContent, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                        return response.data;
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
        // Toggle the selected package; deselect if clicked again
        setSelectedPackage(prevPackage => 
            prevPackage && prevPackage._id === pkg._id ? null : pkg
        );
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
                    alert(response._id)
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
            setError('Please select a package and enter a player name.');
        }
    };

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            {!currentBar?._id ? (
                <Typography>No bar selected or data unavailable</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
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

                    {fullPackages.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Select a Package
                            </Typography>
                            {fullPackages.map(pkg => (
                                <Card
                                    key={pkg._id}  // Add the key prop here
                                    sx={{
                                        maxWidth: 345,
                                        border: selectedPackage && selectedPackage._id === pkg._id ? '2px solid blue' : '1px solid #ccc',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            ${pkg.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {pkg.packagesContant}
                                        </Typography>
                                    </CardContent>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedPackage && selectedPackage._id === pkg._id}
                                                onChange={() => handlePackageChange(pkg)}
                                                sx={{ padding: 0 }}
                                            />
                                        }
                                        label="Select"
                                        sx={{ marginLeft: 2 }}
                                    />
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Typography>No packages available for this bar</Typography>
                    )}

                    <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
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
