import moment from 'moment';
import { memo, useEffect, useState } from 'react';

function Clock() {
  const [time, setTime] = useState(moment().format('Do MMMM YYYY - h:mm:ss A'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('Do MMMM YYYY - h:mm:ss A'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h1>{time}</h1>;
}

export default memo(Clock);
