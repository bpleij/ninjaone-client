import React, {useState, useEffect} from 'react';
import { addDevice, editDevice, deleteDevice } from '../../apiInterface';
import './Modals.css';
import close from '../../assets/close.SVG';

//In general I am not too pleased with my implementation of the modal system, the handeling of the opening and closing in particular.
//I realized too late that the prop drilling was getting out of hand and I should have used a context or redux to manage the state.
//Based on the time I had left I decided to keep some prop drilling and use a simple hack that roughtly simulates an event manager.
//I would avoid window events in a production environment, passing any data this way would not be secure and is not scalable.

function DeviceManagerModal({ modalType, device, setIsModalOpen }) {
    //initialize the form data with the device data if it exists
    const [formData, setFormData] = useState(device || { system_name: '', type: '', hdd_capacity: ''});

    //make the modal open state controllable from the parent component
    const [isModalOpen, setInternalModalOpen] = useState(true);

    const closeModal = () => {
        setInternalModalOpen(false);
    };

    useEffect(() => {
        setIsModalOpen(isModalOpen);
    }, [isModalOpen, setIsModalOpen]);

    if (!isModalOpen) return null;

    //makinbg sure the modalType prop is valid and returning an error for anyone implementing this component
    if (!['edit', 'delete', 'add'].includes(modalType)) {
        throw new Error('DeviceManagerModal requires a modalType prop of "edit", "delete", or "add".');
    };

    //submit the form data to the server
    const submitForm = (event) => {
        event.preventDefault();
        if (modalType === 'add') {
            addDevice(formData);
        } else if (modalType === 'edit' && formData.id) {
            editDevice(formData);
        } else {
            throw new Error('DeviceManagerModal requires a device prop with an id to edit.');
        }
        closeModal();
        //unfortunate hack to force a refresh of the devices table without prop drilling
        window.dispatchEvent(new Event('devicesUpdated'));
    };

    const handleDelete = () => {
        deleteDevice(formData.id);
        closeModal();
        //unfortunate hack to force a refresh of the devices table without prop drilling
        window.dispatchEvent(new Event('devicesUpdated'));
    };

    //Developing this dynamically generated form was a gratifying exersize in react even though the modal component did not turn out as clean as I would have liked.
    return (
        <div className='modal-container'>
            <div className='modal'>
                <button className='icon-button close-modal-button' onClick={closeModal}>
                    <img src={close} alt='close' />
                </button>
                <div className='modal-content'>
                    <div className='modal-header'>
                        {modalType === 'delete' && <h2>Delete device?</h2>}
                        {modalType === 'edit' && <h2>Edit device</h2>}
                        {modalType === 'add' && <h2>Add device</h2>}
                    </div>
                    <div className='modal-body'>
                        {(modalType === 'add' || modalType === 'edit') && (
                            <DeviceForm formData={formData} setFormData={setFormData} onSubmit={submitForm} />
                        )}
                        {modalType === 'delete' && <p>You are about to delete the device <span style={{ fontWeight: 500 }}>{formData.system_name}</span>. This action cannot be undone.</p>}
                    </div>
                    <div className='modal-buttons'>
                        <button className='button-2' onClick={closeModal}>Cancel</button>
                        {modalType === 'delete' && ( <button className='button-1 delete-button' onClick={ handleDelete }> Delete </button>)}
                        {(modalType === 'edit' || modalType === 'add') && <button className='button-1' type='submit' form='deviceForm'>Submit</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

function DeviceForm({ formData, setFormData, onSubmit }) {
    //keep the form data in sync with the input fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        const upperValue = value.toUpperCase().replace(/[^A-Z0-9_-]/g, '');
        //TODO: make sure the device name is unique?
        setFormData({ ...formData, [name]: upperValue });
    };

    return (
        <div className='device-form'>
            <form id='deviceForm' onSubmit={onSubmit}>

                <label htmlFor='system_name'>System name *</label>
                <input type='text' id='system_name' pattern='[A-Z0-9_-]+' title='Use uppercase letters, numbers, - , or _ only.' name='system_name' value={formData.system_name} onChange={handleChange} required/>

                <label htmlFor='type'>Device type *</label>
                <select id='type' name='type' value={formData.type} onChange={handleChange} required>
                    {formData.type === '' &&  <option value='' disabled hidden> Select type </option>}
                    <option value='WINDOWS'>Windows workstation</option>
                    <option value='MAC'>Mac workstation</option>
                    <option value='LINUX'>Linux workstation</option>
                </select>

                <label htmlFor='hdd_capacity'>HDD capacity (GB) *</label>
                <input type='number' id='hdd_capacity' name='hdd_capacity' value={formData.hdd_capacity} onChange={handleChange} required/>
            </form>
        </div>
    );
};

export default DeviceManagerModal;
