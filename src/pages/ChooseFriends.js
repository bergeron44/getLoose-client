import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame, setCurrentGameId } from '../store/actions/liveGameActions';
import { fetchBarPackages } from '../store/actions/barsActions';
import { TextField, Button, Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ChooseFriends.css'; // Import the CSS file

const ChooseFriends = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Retrieve necessary data from the store
    const currentBarIdFromLiveGame = useSelector(state => state.liveGames.bar);
    const barPackages = useSelector(state => state.bars.barPackages);
    const currentBarId = useSelector(state => state.bars.currentBarId);
    const tableName = useSelector(state => state.liveGames.tableName || '');
    const tableNumber = useSelector(state => state.liveGames.tableNumber || '');

    useEffect(() => {
        if (currentBarId||currentBarIdFromLiveGame) {
            console.log(currentBarIdFromLiveGame);
            dispatch(fetchBarPackages(currentBarId))
                .then(() => setLoading(false))
                .catch((err) => {
                    setError('Failed to load packages');
                    setLoading(false);
                    console.error('Error fetching bar packages:', err);
                });
        }
    }, [dispatch, currentBarId,currentBarIdFromLiveGame]);

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handlePackageClick = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleCreateLiveGame = () => {
        if (selectedPackage && playerName) {
            const liveGame = {
                gameType: 'Friends',
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
        <div className="choose-friends-container">
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}

            <Box className="choose-friends-content">
                <Box className="name-section">
                    <Typography variant="h4" gutterBottom>
                        Enter Player Name
                    </Typography>
                    <TextField
                        label="Player Name"
                        value={playerName}
                        onChange={handleNameChange}
                        variant="outlined"
                        className="name-input"
                    />
                </Box>

                <Box className="packages-section">
                    <Typography variant="h6" gutterBottom>
                        Select a Package
                    </Typography>
                    {barPackages.map(pkg => (
                        <Card
                            key={pkg._id}
                            className={`package-card ${selectedPackage && selectedPackage._id === pkg._id ? 'selected' : ''}`}
                        >
                            <CardContent className="package-card-content">
                                <Typography variant="h6" component="div">
                                    ${pkg.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {pkg.packagesContant}
                                </Typography>
                                <Button onClick={() => handlePackageClick(pkg)} className="package-select-button">
                                    Select
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box className="create-game-button">
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
