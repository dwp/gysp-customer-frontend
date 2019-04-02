const AuthAttempts = 3;

module.exports = {
  sessionCount(sessionValue) {
    let sessionCount = sessionValue;
    if (sessionValue === undefined) {
      sessionCount = 1;
    } else {
      sessionCount++;
    }
    return sessionCount;
  },
  checkAuthAttemptLimits(currentAttempts) {
    if (currentAttempts >= AuthAttempts) {
      return true;
    }
    return false;
  },
};
