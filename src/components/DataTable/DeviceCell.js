import React, { useState } from 'react';
import './DataTable.css';
import windowsIcon from '../../assets/windows.SVG';
import macIcon from '../../assets/mac.SVG';
import linuxIcon from '../../assets/linux.SVG';
import OptionsButton from '../OptionsButton/OptionsButton';
import DeviceManagerModal from '../Modals/DeviceModals';

function DeviceCell({device}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalToOpen, setModalToOpen] = useState('');
    const { system_name, type, hdd_capacity } = device;
    //translate the device data to a more user friendly format
    const deviceType = {
        WINDOWS: {
            name: 'Windows workstation',
            icon: windowsIcon,
        },
        MAC: {
            name: 'Mac workstation',
            icon: macIcon,
        },
        LINUX: {
            name: 'Linux workstation',
            icon: linuxIcon,
        },
    };

    //define the menu items for the options button
    const menuItems = [
        {
            text: 'Edit',
            action: () => {
                setModalToOpen('edit');
                setIsModalOpen(true);
            },
            style: {color: 'inherit'},
        },
        {
            text: 'Delete',
            style: {color: '#D53948'},
            action: () => {
                setModalToOpen('delete');
                setIsModalOpen(true);
            },
        },
    ];

    //Refresh the options button when the mouse leaves the cell if the menu is visible
    const [resetButtonState, setResetButtonState] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    //reset the options button state when the mouse leaves the cell
    const resetActiveButtonState = () => {
        if (isMenuVisible) {
            //increment the key to force a re-render of the options button to close the menu
            setResetButtonState((prevKey) => prevKey + 1);
        }
    };
    
    return (
        <>
            <div className='cell-container padding-1-flat underline-2' onMouseLeave={resetActiveButtonState}>
                <div className='device-cell'>
                    <div className='device-name'>
                        <img src={deviceType[type].icon} alt="windows-icon" className='device-icon'></img>
                        {system_name}
                    </div>
                    <div className='device-info'>
                        {deviceType[type].name} - {hdd_capacity} GB
                    </div>
                </div>
                <div>
                    <OptionsButton key={resetButtonState} menuItems={menuItems} setIsMenuVisible={setIsMenuVisible}/>
                </div>
            </div>
            {/* not the best practice to have the modal here, this was done to simpleify code and avoid excessive prop drilling */}
            {isModalOpen && <DeviceManagerModal modalType={modalToOpen} device={device} setIsModalOpen={setIsModalOpen} />}
        </>
    );
};

export default DeviceCell;