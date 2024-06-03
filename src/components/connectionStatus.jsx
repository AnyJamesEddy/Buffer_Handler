import React, { useEffect, useState } from 'react';
import './connectionStatus.css';

export default function ConnectionStatus({status}) {
    const [isConnected, setIsConnected] = useState(false);

    // La tua logica personale per aggiornare lo stato della connessione
    const setStatus = () => {
        if (status==='online')
        setIsConnected(true);
        else setIsConnected(false);
    };

    useEffect(() => {
        setStatus();
    }, [status]);




    return (

            <div className={`status-box ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? 'Online' : 'Offline'}
            </div>
    );
};
