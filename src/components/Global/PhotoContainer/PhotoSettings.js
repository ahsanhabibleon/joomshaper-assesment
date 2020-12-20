import React, { useEffect, useState, useRef } from "react";

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    photoSettings: {
        padding: 20,
        background: '#fff',
        borderRadius: 8,
        position: 'absolute',
        top: 80,
    }
})

function PhotoSettings({ isModalOpen, getModalStatus }) {
    const [open, setOpen] = useState(isModalOpen);
    const node = useRef();

    const handleClickOutside = e => {
        console.log("clicking anywhere");
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
        getModalStatus(false);
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const classes = useStyles()
    return (

        <div className={classes.photoSettings} ref={node}>
            Photo settings
        </div>
    )
}

export default PhotoSettings
