import { useEffect } from "react";
import { useState } from "react";

type TProps = {
  start: number
  time: number
}

function formater(time: number) {

  const parse = {
    days: Math.floor(time / (60 * 60 * 24)),
    hours: Math.floor((time / (60 * 60)) % 24),
    minutes: Math.floor((time / 60) % 60),
    seconds: Math.floor((time) % 60)
  }

  const view = []

  if (parse.days > 0) {
    view.push(`${parse.days} days`)
  }

  if (parse.hours > 0) {
    view.push(`${parse.days > 0 ? ('0' + parse.hours).slice(-2) : parse.hours} h`)
  }
  
  if (parse.minutes > 0) {
    view.push(`${parse.hours > 0 ? ('0' + parse.minutes).slice(-2) : parse.minutes} m`)
  }

  view.push(`${parse.minutes > 0 ? ('0' + parse.seconds).slice(-2) : parse.seconds} sec`)

  return (
    <>{view.join(', ')}</>
  )
}

export default function Counter({start, time}: TProps) {
  // TODO: Move to back  
  const [counter, setCounter] = useState<number>(Math.round(start / 1000 + time * 60 - Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => setCounter(counter - 1), 1000);

    if (counter <= 0) {
      window.location.href = `/404`;
    }
    
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>{formater(counter)}</>
  )
}