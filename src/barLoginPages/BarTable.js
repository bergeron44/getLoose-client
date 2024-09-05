import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLiveGames, fetchLiveGamesFromSameBar, updateLiveGame } from '../store/actions/liveGameActions';
import { fetchBars } from '../store/actions/barsActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Typography, Alert, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import './BarTable.css'; // Import the CSS file

const BASE_URL = 'https://getloose-server.onrender.com';

const BarTable = () => {
    const dispatch = useDispatch();
    const [selectedBarId, setSelectedBarId] = useState('');
    const [packageData, setPackageData] = useState({});

    const liveGames = useSelector(state => state.liveGames.liveGames);
    const loading = useSelector(state => state.liveGames.loading);
    const error = useSelector(state => state.liveGames.error);
    const barsData = useSelector(state => state.bars.bars); 

    useEffect(() => {
        dispatch(fetchBars());
    }, [dispatch]);

    useEffect(() => {
        if (selectedBarId) {
            dispatch(fetchLiveGamesFromSameBar(selectedBarId));  
            fetchBarInfoAndSetupGame(selectedBarId);
        }
    }, [dispatch, selectedBarId]);

    const handleBarChange = (event) => {
        setSelectedBarId(event.target.value);
    };

    const fetchBarInfoAndSetupGame = async (barId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/bar/id/${barId}`);
            if(response.data.barName === "Admin") {
                dispatch(fetchLiveGames()); 
            }
        } catch (error) {
            console.error('Error fetching bar information:', error);
            alert('An error occurred while fetching the bar information. Please try again later.');
        }
    };

    const handleApprovalToggle = (gameId, currentStatus) => {
        const updatedLiveGame = { waiterApprove: !currentStatus };
        dispatch(updateLiveGame(gameId, updatedLiveGame));
    };

    const fetchPackageDetails = async (packageId) => {
        try {
            if (!packageData[packageId]) {
                const response = await axios.get(`${BASE_URL}/api/package/${packageId}`);
                setPackageData(prevState => ({
                    ...prevState,
                    [packageId]: response.data
                }));
            }
        } catch (error) {
            console.error('Error fetching package details:', error);
        }
    };

    useEffect(() => {
        liveGames.forEach(game => {
            fetchPackageDetails(game.package);
        });
    }, [liveGames]);

    return (
        <div className="bar-table-container">
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            
            <Typography variant="h4" gutterBottom className="title">
                Live Games for the Selected Bar
            </Typography>

            <Select
                value={selectedBarId}
                onChange={handleBarChange}
                displayEmpty
                className="bar-select"
            >
                <MenuItem value="" disabled>Select a Bar</MenuItem>
                {barsData.map(bar => (
                    <MenuItem key={bar._id} value={bar._id}>
                        {bar.barName}
                    </MenuItem>
                ))}
            </Select>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Package Name</TableCell>
                            <TableCell>Game Type</TableCell>
                            <TableCell>Table Name</TableCell>
                            <TableCell>Table Number</TableCell>
                            <TableCell>Waiter Approved</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liveGames.map(game => (
                            <TableRow key={game._id}>
                                <TableCell>
                                    {packageData[game.package]?.packagesContant || 'Loading...'}
                                </TableCell>
                                <TableCell>{game.gameType}</TableCell>
                                <TableCell>{game.tableName}</TableCell>
                                <TableCell>{game.tableNumber}</TableCell>
                                <TableCell>{game.waiterApprove ? 'true' : 'false'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={game.waiterApprove ? 'secondary' : 'primary'}
                                        onClick={() => handleApprovalToggle(game._id, game.waiterApprove)}
                                    >
                                        {game.waiterApprove ? 'Revoke Approval' : 'Approve'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BarTable;
