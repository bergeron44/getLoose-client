import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBars } from '../store/actions/barsActions'; // Assuming you have bar data in redux
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Typography, Alert, Select, MenuItem } from '@mui/material';
import './DailyStatisticsTable.css';

const BASE_URL = 'https://getloose-server.onrender.com';

const DailyStatisticsTable = () => {
    const dispatch = useDispatch();
    const [selectedBarId, setSelectedBarId] = useState('');
    const [dailyStatistics, setDailyStatistics] = useState([]);
    const [filteredStatistics, setFilteredStatistics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [packageData, setPackageData] = useState({});
    const barsData = useSelector(state => state.bars.bars);

    useEffect(() => {
        dispatch(fetchBars());
    }, [dispatch]);

    useEffect(() => {
        fetchDailyStatistics();
    }, []);

    useEffect(() => {
        if (selectedBarId) {
            const filtered = dailyStatistics.filter(stat => stat.bar && stat.bar._id === selectedBarId);
            setFilteredStatistics(filtered);
        } else {
            setFilteredStatistics(dailyStatistics);
        }
    }, [selectedBarId, dailyStatistics]);

    const fetchDailyStatistics = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/daily-statistics`);
            setDailyStatistics(response.data);
            setFilteredStatistics(response.data); // Set initial filtered list as all records

            // Fetch package details for each package in dailyStatistics
            const packageIds = response.data.map(stat => stat.package?._id).filter(id => id);
            packageIds.forEach(packageId => {
                if (!packageData[packageId]) {
                    fetchPackageDetails(packageId);
                }
            });
        } catch (err) {
            setError('Failed to fetch daily statistics');
            console.error('Fetch daily statistics error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPackageDetails = async (packageId) => {
        // Ensure packageId is a string
        if (typeof packageId !== 'string') {
            console.error('Invalid packageId:', packageId);
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/package/${packageId}`);
            setPackageData(prevState => ({
                ...prevState,
                [packageId]: response.data.packagesContant
            }));
        } catch (error) {
            console.error('Error fetching package details:', error);
        }
    };

    const handleBarChange = (event) => {
        setSelectedBarId(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/daily-statistics/${id}`);
            setDailyStatistics(dailyStatistics.filter(stat => stat._id !== id));
            setFilteredStatistics(filteredStatistics.filter(stat => stat._id !== id)); // Also remove from filtered list
        } catch (err) {
            console.error('Error deleting record:', err);
            alert('Failed to delete the record. Please try again.');
        }
    };

    return (
        <div className="daily-statistics-table-container">
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            
            <Typography variant="h4" gutterBottom className="daily-statistics-table-title">
                Daily Statistics
            </Typography>

            <Select
                value={selectedBarId}
                onChange={handleBarChange}
                displayEmpty
                className="daily-statistics-table-select"
            >
                <MenuItem value="" disabled>Select a Bar</MenuItem>
                {barsData.map(bar => (
                    <MenuItem key={bar._id} value={bar._id}>
                        {bar.barName}
                    </MenuItem>
                ))}
            </Select>

            <TableContainer component={Paper}>
                <Table className="daily-statistics-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Package</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rebuy</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStatistics.map(stat => (
                            <TableRow key={stat._id}>
                                <TableCell>{stat.day}</TableCell>
                                <TableCell>
                                    {stat.package ? (
                                        packageData[stat.package._id] ? packageData[stat.package._id] : 'Loading...'
                                    ) : 'No Package Data'}
                                </TableCell>
                                <TableCell>{new Date(stat.date).toLocaleDateString()}</TableCell>
                                <TableCell>{stat.quantity}</TableCell>
                                <TableCell>{stat.rebuy}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(stat._id)}
                                    >
                                        Delete
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

export default DailyStatisticsTable;
