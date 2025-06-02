import React, { useState, useEffect } from "react";

export const CountDownTimer = ({ setLoginAttempts, location }) => {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    // Get Vietnam time
    let date = new Date();
    date = new Date(new Date().toLocaleString("en-US", { timeZone: location }));

    // Add 5 minutes
    const penaltyMinutes = 5;
    let countDownDate = date.getTime() + penaltyMinutes * 60 * 1000;

    // Update countdown every second
    const x = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(x);
        setLoginAttempts(0);
        setTimeLeft("EXPIRED");
        return;
      }

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(x);
  }, []); // Runs only once when the component mounts

  return <p id="countDownTimer">{timeLeft}</p>;
};
