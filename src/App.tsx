import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ExpiredScreen from './components/ExpiredScreen';
import { checkTrialStatus } from './utils/trialManager';

function App() {
  const [trialStatus, setTrialStatus] = useState<'inactive' | 'active' | 'expired'>('inactive');

  useEffect(() => {
    const status = checkTrialStatus();
    setTrialStatus(status);
  }, []);

  const handleActivateTrial = () => {
    const trialStart = Date.now();
    localStorage.setItem('trial-start', trialStart.toString());
    setTrialStatus('active');
  };

  if (trialStatus === 'inactive') {
    return <LandingPage onActivate={handleActivateTrial} />;
  }

  if (trialStatus === 'expired') {
    return <ExpiredScreen />;
  }

  return <Dashboard onTrialExpired={() => setTrialStatus('expired')} />;
}

export default App;
