import React, { useState, useEffect } from 'react';

function TimeProgressBar({ duration }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;
    if (progress < 100) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = (100 / duration) * 0.1;
          return Math.min(prevProgress + increment, 100);
        });
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [duration, progress]);

  const barStyle = {
    width: `${progress}%`,
    height: '10px',
    backgroundColor: 'green',
    transition: 'width 0.1s linear',
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#eee' }}>
      <div style={barStyle}></div>
    </div>
  );
}

export default TimeProgressBar;