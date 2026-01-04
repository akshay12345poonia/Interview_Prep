import React from 'react';
import Alert from './Alert';
import { useAlerts } from './AlertContext';

const AlertContainer = () => {
  const { alerts, removeAlert } = useAlerts();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 w-full max-w-md px-4">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          id={alert.id}
          type={alert.type}
          message={alert.message}
          autoDismiss={alert.autoDismiss}
          onDismiss={removeAlert}
        />
      ))}
    </div>
  );
};

export default AlertContainer;
