import React, { createContext, useContext, useState, useCallback } from 'react';

const AlertContext = createContext(null);

let alertId = 0;

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((type, message, autoDismiss = true) => {
    const id = ++alertId;
    setAlerts(prev => [...prev, { id, type, message, autoDismiss }]);
    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const success = useCallback((message, autoDismiss) => addAlert('success', message, autoDismiss), [addAlert]);
  const error = useCallback((message, autoDismiss) => addAlert('error', message, autoDismiss), [addAlert]);
  const warning = useCallback((message, autoDismiss) => addAlert('warning', message, autoDismiss), [addAlert]);
  const info = useCallback((message, autoDismiss) => addAlert('info', message, autoDismiss), [addAlert]);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, success, error, warning, info }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};
