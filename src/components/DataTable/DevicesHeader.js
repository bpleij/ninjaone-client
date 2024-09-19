import React, {useState} from 'react';
import DeviceManagerModal from '../Modals/DeviceModals';
import plus from '../../assets/plus.SVG';

function DevicesHeader() {
    //manage the add device modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className='devices-header padding-1'>
                <h1 className='header-title'>
                    Devices
                </h1>
                <button className='add-device button-1' onClick={() => setIsModalOpen(true)}>
                    <img src={plus} alt="plus" className='button-icon'></img>
                    Add device
                </button>
            </div>
            {isModalOpen && <DeviceManagerModal modalType={'add'} setIsModalOpen={setIsModalOpen} />}
        </>
    );
};

export default DevicesHeader;
