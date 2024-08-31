import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLiveGames, updateApprovalStatus } from '../store/actions/liveGameActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Typography, Alert } from '@mui/material';

const BarTable = () => {
    const dispatch = useDispatch();
    const liveGames = useSelector(state => state.liveGame.liveGames);
    const loading = useSelector(state => state.liveGame.loading);
    const error = useSelector(state => state.liveGame.error);
    const currentBarId = useSelector(state => state.bars.currentBarId); // Assuming you have the currentBarId in your Redux store

    useEffect(() => {
        if (currentBarId) {
            dispatch(fetchLiveGames(currentBarId));
        }
    }, [dispatch, currentBarId]);

    const handleApprovalToggle = (gameId, currentStatus) => {
        dispatch(updateApprovalStatus(gameId, !currentStatus));
    };

    return (
        <div>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

            <Typography variant="h4" gutterBottom>
                Live Games for the Bar
            </Typography>

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
