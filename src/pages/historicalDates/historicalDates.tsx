import React, { useRef } from 'react';
import { historicDates } from '../../historic-dates';
import './historicalDates.scss';
import gsap from "gsap";
import DateCircle from '../../components/dateCircle/dateCircle';
import SliderHistory from '../../components/sliderHistory/sliderHistory';

function HistoricalDates() {

  const numberOfEvents = historicDates.length;
  const angleBetweenDots = 360 / numberOfEvents;
  const defaultTimeOfRotation = 300;

  const sliderRef = useRef<HTMLDivElement>(null);
  const mainCircleRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = React.useState<number>(angleBetweenDots);
  const [currentEvent, setCurrentEvent] = React.useState<number>(0);
  const [timeOfRotation, setTimeOfRotation] = React.useState<number>(defaultTimeOfRotation);
  const [startDate, setStartDate] = React.useState<number>(Number(historicDates[0].events[0].date));
  const [endDate, setEndDate] = React.useState<number>(Number(historicDates[0].events[historicDates.length - 1].date));

  React.useEffect(() => {
    const timer = setTimeout(() => {
      sliderRef.current?.classList.add("slider_show");
      clearTimeout(timer);
    }, 300);
  }, [currentEvent]);

  function getTotal(length: number, index: number): string {
    return `${String(index + 1).padStart(2,'0')}/${String(length).padStart(2,'0')}`;
  }

  function fadeIt(fn: Function):void {
    sliderRef.current?.classList.remove("slider_show");
    const timer = setTimeout(() => {
      fn();
      clearTimeout(timer);
    }, 300);
  }
  
  function loadPrev():void {
    loadThis(currentEvent - 1);
  }

  function loadNext():void {
    loadThis(currentEvent + 1);
  }

  function animateDatesRange(index: number): void {
    const newStartDate = Number(historicDates[index].events[0].date);
    const startRange = newStartDate - startDate;
    const newEndDate = Number(historicDates[index].events[historicDates.length - 1].date);
    const endRange = newEndDate - endDate;
    const animationTime = (timeOfRotation + 300) / 1000;

    gsap.to(startDateRef.current, {
      duration: animationTime,
      textContent: `+=${startRange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setStartDate(newStartDate)
    });
    gsap.to(endDateRef.current, {
      duration: animationTime,
      textContent: `+=${endRange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setEndDate(newEndDate)
    });
  }

  function loadThis(index: number):void {

    animateDatesRange(index);

    mainCircleRef.current?.children[index].classList.add("spinner__shoulder_active");
    
    const angleOfRotation = angleBetweenDots - index * angleBetweenDots;
    setTimeOfRotation(Math.abs(currentEvent - index) * defaultTimeOfRotation);
    const timer = setTimeout(() => {
      setAngle(angleOfRotation);
      clearTimeout(timer);
    }, 300);

    fadeIt(() => setCurrentEvent(index));
  }

  return (
    <main className='main'>
      <section className='historic-dates'>
        <h1 className='historic-dates__heading'>Исторические даты</h1>

        <DateCircle 
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          mainCircleRef={mainCircleRef}
          startDate={startDate}
          endDate={endDate}
          numberOfEvents={numberOfEvents}
          loadThis={loadThis}
          currentEvent={currentEvent}
          timeOfRotation={timeOfRotation}
          historicDates={historicDates}
          angle={angle}
        />

        <div className="historic-dates__navigation navigation">
          <p className='navigation__total'>{getTotal(numberOfEvents, currentEvent)}</p>
          <div className='navigation__buttons control-buttons'>
            <button 
              className='control-buttons__default control-buttons__prev'
              onClick={loadPrev}
              disabled={currentEvent === 0 ? true : false}
            >
            </button>
            <button
              className='control-buttons__default control-buttons__next'
              onClick={loadNext}
              disabled={currentEvent === numberOfEvents - 1 ? true : false}
            >
            </button>
          </div>
        </div>
        
        <SliderHistory
          sliderRef={sliderRef}
          currentEvent={currentEvent}
          historicDates={historicDates}
        />
        
        <div className='events__control-buttons'>
          {
            historicDates.map((_, index) => {
              return <button 
                className={"events__button " + (currentEvent === index ? 'events__button_active' : '')}
                key={index}
                onClick={() => loadThis(index)}
                ></button>
            })
          }
        </div>
      </section>
    </main>
  );
}

export default HistoricalDates;
