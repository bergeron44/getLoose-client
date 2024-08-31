import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame } from '../store/actions/liveGameActions';
import { fetchBarPackages } from '../store/actions/barsActions';
import { TextField, Button, Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseFriends = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Retrieve necessary data from the store
    const barPackages = useSelector(state => state.bars.barPackages);
    const currentBarId = useSelector(state => state.bars.currentBarId);
    const tableName = useSelector(state => state.liveGame?.currentTableName || '');
    const tableNumber = useSelector(state => state.liveGame?.currentTableNumber || '');

    console.log('barPackages:', barPackages);
    console.log('currentBarId:', currentBarId);
    console.log('tableName:', tableName);
    console.log('tableNumber:', tableNumber);

    // Fetch bar packages when the component mounts
    useEffect(() => {
        if (currentBarId) {
            dispatch(fetchBarPackages(currentBarId))
                .then(() => {
                    setLoading(false);
                    console.log('Fetched bar packages successfully');
                })
                .catch((err) => {
                    setError('Failed to load packages');
                    setLoading(false);
                    console.error('Error fetching bar packages:', err);
                });
        }
    }, [dispatch, currentBarId]);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
        console.log('Player name updated:', event.target.value);
    };

    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
        console.log('Package selected:', pkg);
    };

    const handleCreateLiveGame = () => {
        if (selectedPackage && playerName) {
            console.log('Creating live game with:', { selectedPackage, playerName, tableName, tableNumber });
            const liveGame = {
                gameType: 'Friends',
                bar: currentBarId,
                tableName: tableName,
                tableNumber: tableNumber,
                package: selectedPackage._id,
                playersNames: [playerName],
            };

            dispatch(createLiveGame(liveGame))
                .then(action => {
                    const newGameId = action.payload._id;
                    console.log('Live game created successfully with ID:', newGameId);
                    dispatch({ type: 'SET_CURRENT_GAME_ID', payload: newGameId });
                    setSuccessMessage('Live game created successfully!');
                    navigate('/WaitingForApproval');
                })
                .catch((err) => {
                    setError('Failed to create live game');
                    console.error('Error creating live game:', err);
                });
        } else {
            setError('Please select a package and enter a player name.');
            console.warn('Attempted to create live game without selecting a package or entering a name');
        }
    };

    return (
        <div>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateLiveGame}
                        disabled={!selectedPackage || !playerName}
                    >
                        Create Live Game
                    </Button>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, padding: 2 }}>
                    {barPackages.map(pkg => (
                        <Card
                            key={pkg._id}
                            sx={{
                                maxWidth: 345,
                                border: selectedPackage && selectedPackage._id === pkg._id ? '2px solid blue' : 'none'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {pkg.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {pkg.packagesContant} {/* Adjust according to your package schema */}
                                </Typography>
                                <Button onClick={() => handlePackageClick(pkg)}>
                                    Select
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default ChooseFriends;
