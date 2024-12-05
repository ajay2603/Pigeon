function dispTime(time) {
  const tim = new Date(time);

  if (!isNaN(tim)) {
    let hours = tim.getHours();
    const minutes = tim.getMinutes();
    let period = "AM"

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }

    if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  } else {
    return time;
  }
}

export default dispTime;
