import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLiveGames, fetchLiveGamesFromSameBar, updateApprovalStatus } from '../store/actions/liveGameActions'; // Update with correct path to your actions
import { fetchBars } from '../store/actions/barsActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Typography, Alert, Select, MenuItem } from '@mui/material';

const BarTable = () => {
    const dispatch = useDispatch();
    const [selectedBarId, setSelectedBarId] = useState('');
    const [bars, setBars] = useState([]);

    // Redux state
    const liveGames = useSelector(state => state.liveGames.liveGames);
    const loading = useSelector(state => state.liveGames.loading);
    const error = useSelector(state => state.liveGames.error);
    const barsData = useSelector(state => state.bars.bars); // Assuming bars are stored in Redux store

    useEffect(() => {
        // Fetch all bars on component mount
        dispatch(fetchBars());
    }, [dispatch]);

    useEffect(() => {
        if (selectedBarId) {
            dispatch(fetchLiveGamesFromSameBar(selectedBarId));  
            //dispatch(fetchLiveGames(selectedBarId));
        }
    }, [dispatch, selectedBarId]);

    const handleBarChange = (event) => {
        setSelectedBarId(event.target.value);
    };

    const handleApprovalToggle = (gameId, currentStatus) => {
        dispatch(updateApprovalStatus(gameId, !currentStatus));
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
                                <TableCell>{game.waiterApprove ? 'Yes' : 'No'}</TableCell>
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
