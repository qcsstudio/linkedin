import { logOut } from "./logout";

const INACTIVITY_LIMIT =  10 * 60 * 1000; // 10 minutes
const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

let inactivityTimer;

const clearSession = async() => {
    await logOut();
    if (typeof window === 'undefined') {
        window.location.reload();
    }
};

const resetTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(clearSession, INACTIVITY_LIMIT);
};

export const setupInactivityTimer = () => {
  if (typeof window === 'undefined') return () => {};
  ACTIVITY_EVENTS.forEach(event => {
    window.addEventListener(event, resetTimer, { passive: true });
  });

  resetTimer();

  return () => {
    clearTimeout(inactivityTimer);
    ACTIVITY_EVENTS.forEach(event => {
      window.removeEventListener(event, resetTimer);
    });
  };
};