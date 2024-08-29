import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLiveGame } from '../store/actions/liveGameActions'; // Assuming these actions are defined
import { fetchBarPackages } from '../store/actions/barsActions'; // Assuming these actions are defined
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';

const ChooseDate = () => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const barPackages = useSelector(state => state.bars.barPackages); // Assuming you store packages in state.bars.barPackages

  // Fetch bar packages when the component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      const barId = 'current-bar-id'; // Replace with logic to get current bar ID
      dispatch(fetchBarPackages(barId));
    };

    fetchPackages();
  }, [dispatch]);

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleCreateLiveGame = () => {
    if (selectedPackage) {
      const liveGame = {
        gameType: 'Date', // Adjust as needed
        bar: 'current-bar-id', // Replace with actual bar ID
        tableName: 'Table Name', // Replace with actual table name or allow user input
        tableNumber: 1, // Replace with actual table number or allow user input
        package: selectedPackage._id,
        playersNames: [playerName]
      };

      dispatch(createLiveGame(liveGame));
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Top Half: Input for Player Name and Button */}
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
          >
            Create Live Game
          </Button>
        </Box>

        {/* Bottom Half: Gallery of Packages */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, padding: 2 }}>
          {barPackages.map(pkg => (
            <Card key={pkg._id} sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {pkg.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pkg.packagesContant} {/* Adjust according to your package schema */}
                </Typography>
                <Button onClick={() => handlePackageClick(pkg)}>Select</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ChooseDate;
