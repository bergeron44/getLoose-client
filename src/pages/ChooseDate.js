import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame } from '../store/actions/liveGameActions';
import { fetchBarPackages } from '../store/actions/barsActions';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseDate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Retrieve necessary data from the store
  const barPackages = useSelector(state => state.bars.barPackages);
  const currentBarId = useSelector(state => state.bars.currentBarId);
  const tableName = useSelector(state => state.liveGame.currentTableName); // Assuming you have this in your store
  const tableNumber = useSelector(state => state.liveGame.currentTableNumber); // Assuming you have this in your store

  // Fetch bar packages when the component mounts
  useEffect(() => {
    if (currentBarId) {
      dispatch(fetchBarPackages(currentBarId));
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
        gameType: 'Date',
        bar: currentBarId,
        tableName: tableName, // Retrieved from the store
        tableNumber: tableNumber, // Retrieved from the store
        package: selectedPackage._id,
        playersNames: [playerName],
      };

      dispatch(createLiveGame(liveGame));
      navigate('/logo'); // Redirect to the logo page
    }
  };

  return (
    <div>
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
            disabled={!selectedPackage || !playerName} // Disable if no package or name
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

export default ChooseDate;
