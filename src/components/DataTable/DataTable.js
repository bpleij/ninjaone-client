import React, { useState, useEffect, useMemo } from 'react';
import './DataTable.css';
import DeviceCell from './DeviceCell';
import refresh  from '../../assets/refresh.SVG';
import search from '../../assets/search.SVG';
import expand from '../../assets/expand.SVG';
import { filterAndSortDevices } from '../../utilities';
import { fetchDevices } from '../../apiInterface';

function DataTable() {
    const [devices, setDevices] = useState([]);
    const [searchString, setsearchString] = useState('');
    const [deviceTypeFilter, setDeviceTypeFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('descending');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //fetch the devices from the server
    useEffect(() => {
        fetchDevices(setDevices, setError, setLoading);
    
        const handleDevicesUpdated = () => {
            fetchDevices(setDevices, setError, setLoading);
        };
        
        //hack from the modals to force a refresh of the devices table :(
        window.addEventListener('devicesUpdated', handleDevicesUpdated);
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('devicesUpdated', handleDevicesUpdated);
        };
    }, []);
    
    //memorize the filtered devices to avoid re-rendering on every keystroke
    const filteredDevices = useMemo(() => {
        return filterAndSortDevices(devices, searchString, deviceTypeFilter, sortOrder);
    }, [devices, searchString, deviceTypeFilter, sortOrder]);

    //reset the filters to their default values
    const resetFilters = () => {
        setDevices([]);
        setsearchString('');
        setDeviceTypeFilter('all');
        setSortOrder('descending');
        setError(null);
        setLoading(true);
        fetchDevices(setDevices, setError, setLoading);
    };

    return (
        <div className='data-table'>
            <div className='table-actions padding-1'>
                <div className='table-options'>
                    <input name='search device' value={searchString} className='search-bar' type='search' placeholder='Search' style={{backgroundImage: `url(${search})`}} onChange={(event) => setsearchString(event.target.value)}></input>
                    <select name='sort device types' value={deviceTypeFilter} className='device-filter' style={{backgroundImage: `url(${expand})`}} onChange={(event) => setDeviceTypeFilter(event.target.value)}>
                        <option value='all'>Device Type: All</option>
                        <option value='WINDOWS'>Device Type: Windows</option>
                        <option value='MAC'>Device Type: Mac</option>
                        <option value='LINUX'>Device Type: Linux</option>
                    </select>
                    <select name='sort devices' value={sortOrder} className='sort-order' style={{backgroundImage: `url(${expand})`}} onChange={(event) => setSortOrder(event.target.value)}>
                        <option value='descending'>Sort by: HDD Capacity (Descending)</option>
                        <option value='ascending'>Sort by: HDD Capacity (Ascending)</option>
                    </select>
                </div>
                <button className='reset-button icon-button' alt='reset filters' onClick={() => {resetFilters()}}>
                    <img src={refresh} alt='refresh-icon'></img>
                </button>
            </div>
            <div className='table-header padding-1-flat margin-1-flat underline-1'>
                <h2>
                    Devices
                </h2>
            </div>
            <div className='table-container'>
                {loading && <p style={{textAlign: 'center', padding: '25px 0px'}}>Loading devices...</p>}
                {error && <p style={{textAlign: 'center', padding: '25px 0px'}}>{error}</p>}
                {!loading && !error && filteredDevices.length === 0 && (<p style={{ textAlign: 'center', padding: '25px 0px' }}>No devices found.</p>)}
                {filteredDevices.map((device, index) => (
                    <DeviceCell key={index} device={device}/>
                ))}
            </div>
        </div>
    );
};

export default DataTable;