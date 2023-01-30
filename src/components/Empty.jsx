import React from 'react';

const Empty = (props) => {

    const extraClass = props.extraClass || ""
    
    return (
        <div className="place">
            <div className={extraClass}>
            <div class="lds-ripple"><div></div><div></div></div>
            </div>
        </div>
    );
}

export default Empty;
