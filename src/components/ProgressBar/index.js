import * as Colors from "../../constants/colors.json"
import React from "react"

const ProgressBar = ({ bgcolor, completed, showPercentage }) => {


    const containerStyles = {
        height: 10,
        width: '100%',
        backgroundColor: Colors.selectorActive,
        borderRadius: 50,
        margin: "10px 0 10px 0",
        border: `1px solid ${bgcolor}`,
        //borderWidth: '1px'
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>
                    {
                        showPercentage ?
                            `${completed}%`
                            : ''
                    }
                </span>
            </div>
        </div>
    );
};

export default ProgressBar