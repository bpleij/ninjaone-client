import React, { useState, useEffect } from 'react';
import './OptionsButton.css';
import options from '../../assets/options.SVG';

//In general I am fairly pleased with the implementation of the OptionsButton component. In retrospect I would have liked to have used a context or redux to manage the visibility of the menu.
//Outside of React I would have used Javascript and CSS to manage the visibility of the menu. Using React to manage menu rendering was a good learning experience.
//By rendering the menus conditionally we avoid passing unnecessary data to the DOM which has security and scalability implications.

function OptionsMenu({menuItems}) {
    return (
        <div className='options-menu'>
            {menuItems.map((item ,index) => (
                <button key={index} className='menu-item padding-1-flat' onClick={item.action} style={item.style}>{item.text}</button>
            ))}
        </div>
    );
};

function OptionsButton({menuItems, setIsMenuVisible }) {
    //make sure menuItems is passed in, this error message also provides an example of how the menuItmes array should be structured.
    if (menuItems) {
        menuItems.forEach((item) => {
            if (!item.text) {
                throw new Error('OptionMenu items must have a text property.');
                //not requiring an actions propery allows for possible menu header items (ideally in cobination with a suitable style property).
            };
        });
    } else {
        //this error also provides an example of how the menuItems array should be structured.
        throw new Error(`
            OptionsMenu component requires menuItems prop.
            Example:
            const menuItems = [
                {
                    text: 'Edit',
                    action: () => {
                        console.log('Open edit modal');
                    },
                    style: {color: 'inherit'},
                },
                {
                    text: 'Delete',
                    style: {color: '#D53948'},
                    action: () => {
                        console.log('Open delete modal');
                    },
                },
            ];
        `);
    };

    const [menuVisible, setMenuVisible] = useState(false);
    // Update parent with menu visibility state to allow the parent to close the menu if needed.
    useEffect(() => {
        setIsMenuVisible(menuVisible);
    }, [menuVisible, setIsMenuVisible]);
    
    const toggleOptionsMenu = () => {
        setMenuVisible(visible => !visible);
    };
    
    return (
        <div className='options-container'>
            <button className='options-button icon-button ' alt='Device Options' onClick={toggleOptionsMenu}>
                <img src={options} alt='options-icon'></img>
            </button>
            {menuVisible && <OptionsMenu menuItems={menuItems} />}
        </div>

    );
};

export default OptionsButton;
