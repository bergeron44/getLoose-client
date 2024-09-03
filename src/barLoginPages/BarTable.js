import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLiveGames, fetchLiveGamesFromSameBar, updateApprovalStatus, updateLiveGame } from '../store/actions/liveGameActions'; // Update with correct path to your actions
import { fetchBars } from '../store/actions/barsActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Typography, Alert, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const BarTable = () => {
    const dispatch = useDispatch();
    const [selectedBarId, setSelectedBarId] = useState('');
    const [bars, setBars] = useState([]);

    // Redux state
    const liveGames = useSelector(state => state.liveGames.liveGames);
    const loading = useSelector(state => state.liveGames.loading);
    const error = useSelector(state => state.liveGames.error);
    const barsData = useSelector(state => state.bars.bars); // Assuming bars are stored in Redux store
    var response ;
    useEffect(() => {
        // Fetch all bars on component mount
        dispatch(fetchBars());
    }, [dispatch]);

    useEffect(() => {
        if (selectedBarId) {
            dispatch(fetchLiveGamesFromSameBar(selectedBarId));  
            fetchBarInfoAndSetupGame(selectedBarId);
            //dispatch(fetchLiveGames(selectedBarId));
        }
    }, [dispatch, selectedBarId]);

    const handleBarChange = (event) => {
        setSelectedBarId(event.target.value);
    };
    const fetchBarInfoAndSetupGame = async (barId) => {
        try {
            
            const response = await axios.get(`http://localhost:3001/api/bar/id/${barId}`);

            // Process the response here
            console.log(response.data); // For debugging
            if(response.data.barName==="Admin")
                {
                    dispatch(fetchLiveGames()); 
                }
        } catch (error) {
            console.error('Error fetching bar information:', error);
            // Optionally, display a user-friendly message or handle specific error scenarios
            alert('An error occurred while fetching the bar information. Please try again later.');
        }
    };
    const handleApprovalToggle = (gameId, currentStatus) => {
         var bool=(!currentStatus);
        console.log(bool)
        const updatedLiveGame = { waiterApprove: bool };
        dispatch(updateLiveGame(gameId, updatedLiveGame));
    };

    return (
        <div>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            
            <Typography variant="h4" gutterBottom>
                Live Games for the Selected Bar
            </Typography>

            <Select
                value={selectedBarId}
                onChange={handleBarChange}
                displayEmpty
                sx={{ marginBottom: 2 }}
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
                            <TableCell>Game ID</TableCell>
                            <TableCell>Game Type</TableCell>
                            <TableCell>Table Name</TableCell>
                            <TableCell>Table Number</TableCell>
                            <TableCell>Players</TableCell>
                            <TableCell>Waiter Approved</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liveGames.map(game => (
                            <TableRow key={game._id}>
                                <TableCell>{game._id}</TableCell>
                                <TableCell>{game.gameType}</TableCell>
                                <TableCell>{game.tableName}</TableCell>
                                <TableCell>{game.tableNumber}</TableCell>
                                <TableCell>{game.playersNames.join(', ')}</TableCell>
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
