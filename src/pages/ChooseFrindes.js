import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame, setCurrentGameId } from '../store/actions/liveGameActions';
import { fetchBarPackages } from '../store/actions/barsActions';
import { TextField, Button, Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseFriends = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Retrieve necessary data from the store
    const barPackages = useSelector(state => state.bars.barPackages);
    const currentBarId = useSelector(state => state.bars.currentBarId);
    const tableName = useSelector(state => state.liveGames.tableName || '');
    const tableNumber = useSelector(state => state.liveGames.tableNumber || '');

    useEffect(() => {
        if (currentBarId) {
            dispatch(fetchBarPackages(currentBarId))
                .then(() => setLoading(false))
                .catch((err) => {
                    setError('Failed to load packages');
                    setLoading(false);
                    console.error('Error fetching bar packages:', err);
                });
        }
    }, [dispatch, currentBarId]);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleCreateLiveGame = () => {
        if (selectedPackage && playerName) {
            const liveGame = {
                gameType: 'Friends', // Changed from 'Date' to 'Friends'
                bar: currentBarId,
                tableName: tableName,
                tableNumber: tableNumber,
                package: selectedPackage._id,
                playersNames: [playerName],
            };

            dispatch(createLiveGame(liveGame))
                .then(response => {
                    const newGameId = response.payload._id; // Adjust according to your API response
                    dispatch(setCurrentGameId(newGameId));
                    setSuccessMessage('Live game created successfully!');
                    navigate('/WaitingForApproval');
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
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Enter Player Name
                    </Typography>
                    <TextField
                        label="Player Name"
                        value={playerName}
                        onChange={handleNameChange}
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Select a Package
                    </Typography>
                    {barPackages.map(pkg => (
                        <Card
                            key={pkg._id}
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
                                <Typography variant="h6" component="div">
                                    ${pkg.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {pkg.packagesContant}
                                </Typography>
                                <Button onClick={() => handlePackageClick(pkg)} sx={{ marginTop: 2 }}>
                                    Select
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateLiveGame}
                        disabled={!selectedPackage || !playerName}
                    >
                        Create Live Game
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default ChooseFriends;
