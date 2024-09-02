import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBar } from '../../store/actions/barsActions'; // Adjust import paths if necessary
import { fetchPackages } from '../../store/actions/packagesActions';
import './AddBar.css'; // Import the CSS file

const AddBar = () => {
    const dispatch = useDispatch();
    const packages = useSelector((state) => state.packages); // Assuming you have a reducer handling packages
    const [barName, setBarName] = useState('');
    const [location, setLocation] = useState({ type: 'Point', coordinates: [0, 0] });
    const [capacity, setCapacity] = useState(0);
    const [qrUrl, setQrUrl] = useState('');
    const [selectedPackages, setSelectedPackages] = useState(new Set());
    const [availablePackages, setAvailablePackages] = useState([]);

    useEffect(() => {
        // Fetch packages when the component mounts
        const fetchAvailablePackages = async () => {
            try {
                await dispatch(fetchPackages());
                const fetchedPackages = packages.packages;
                setAvailablePackages(fetchedPackages || []); // Ensure it's always an array
            } catch (error) {
                console.error('Failed to fetch packages:', error);
                setAvailablePackages([]); // Fallback to an empty array on error
            }
        };
        fetchAvailablePackages();
    }, [dispatch, packages]);

    const handlePackageToggle = (pkgId) => {
        setSelectedPackages(prevSelected => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(pkgId)) {
                updatedSelected.delete(pkgId); // Remove from selected if already present
            } else {
                updatedSelected.add(pkgId); // Add to selected if not present
            }
            return updatedSelected;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const barData = {
            barName,
            location,
            capacity: parseInt(capacity, 10),
            qrUrl,
            barPackages: Array.from(selectedPackages), // Convert Set to Array
        };

        dispatch(createBar(barData));

        resetForm();
    };

    const resetForm = () => {
        setBarName('');
        setLocation({ type: 'Point', coordinates: [0, 0] });
        setCapacity(0);
        setQrUrl('');
        setSelectedPackages(new Set());
    };

    return (
        <div className="add-bar-container">
            <h2>Add a New Bar</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="barName">Bar Name:</label>
                    <input
                        type="text"
                        id="barName"
                        value={barName}
                        onChange={(e) => setBarName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coordinates">Location (Longitude, Latitude):</label>
                    <input
                        type="text"
                        id="coordinates"
                        value={location.coordinates.join(', ')}
                        onChange={(e) =>
                            setLocation({ ...location, coordinates: e.target.value.split(',').map(Number) })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="qrUrl">QR URL:</label>
                    <input
                        type="text"
                        id="qrUrl"
                        value={qrUrl}
                        onChange={(e) => setQrUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Select Packages:</label>
                    <div className="packages-container">
                        {availablePackages.map(pkg => (
                            <div
                                key={pkg._id}
                                className={`package-box ${selectedPackages.has(pkg._id) ? 'selected' : ''}`}
                                onClick={() => handlePackageToggle(pkg._id)}
                            >
                                <h4>{pkg.packagesContant}</h4>
                                <p>Price: ${pkg.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">Add Bar</button>
                <button type="button" onClick={resetForm}>Clear</button>
            </form>
        </div>
    );
};

export default AddBar;
