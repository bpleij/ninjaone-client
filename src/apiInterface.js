//Separated the API calls from the components to keep the components clean and easy to read.

const fetchDevices = async (setDevices, setError, setLoading) => {
    setLoading(true);
    try {
        const response = await fetch('/devices');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // await new Promise(resolve => setTimeout(resolve, 3000));
        setDevices(data);
        setError(null);
    } catch (error) {
        console.log(`Error fetching devices: ${error.message}`);
        return setError('Error fetching devices. Please contact your system administrator.');
    } finally {
        setLoading(false);
    }
};

const getDevice = async (id) => {
    try {
        const response = await fetch(`/devices/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error fetching device: ${error.message}`);
    }
}

const deleteDevice = async (id) => {
    try {
        const response = await fetch(`/devices/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(`Error deleting device: ${error.message}`);
    }
};

const addDevice = async (device) => {
    try {
        const response = await fetch('/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(device),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(`Error adding device: ${error.message}`);
    }
};

const editDevice = async (device) => {
    try {
        const response = await fetch(`/devices/${device.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(device),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(`Error editing device: ${error.message}`);
    }
};

export { fetchDevices, getDevice, deleteDevice, addDevice, editDevice };