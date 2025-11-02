const TRIAL_DURATION = 7 * 24 * 60 * 60 * 1000;

export function checkTrialStatus(): 'inactive' | 'active' | 'expired' {
  const trialStart = localStorage.getItem('trial-start');

  if (!trialStart) {
    return 'inactive';
  }

  const startTime = parseInt(trialStart, 10);
  const currentTime = Date.now();
  const elapsed = currentTime - startTime;

  if (elapsed >= TRIAL_DURATION) {
    return 'expired';
  }

  return 'active';
}

export function getTimeRemaining(): { days: number; hours: number; minutes: number } {
  const trialStart = localStorage.getItem('trial-start');

  if (!trialStart) {
    return { days: 7, hours: 0, minutes: 0 };
  }

  const startTime = parseInt(trialStart, 10);
  const currentTime = Date.now();
  const elapsed = currentTime - startTime;
  const remaining = TRIAL_DURATION - elapsed;

  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

  return { days, hours, minutes };
}
