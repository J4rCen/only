import React, { Ref } from 'react';
import './dateCircle.scss';

interface DateCircleProps {
  startDateRef: Ref<HTMLDivElement>;
  endDateRef: Ref<HTMLDivElement>;
  mainCircleRef: Ref<HTMLDivElement>;
  startDate: number;
  endDate: number;
  numberOfEvents: number;
  timeOfRotation: number;
  angle: number
  historicDates: any[]
  currentEvent: number;
  loadThis: (index: number) => void
}

const DateCircle: React.FC<DateCircleProps> = ({
  startDateRef,
  startDate,
  endDateRef,
  endDate,
  mainCircleRef,
  numberOfEvents,
  angle,
  timeOfRotation,
  historicDates,
  loadThis,
  currentEvent,
}) => {

  return (
    <div>
      <div className="historic-dates__range range">
          <p className='range_start' ref={startDateRef}>{startDate}</p>
          <p className='range_end' ref={endDateRef}>{endDate}</p>
        </div>
        <div className="historic-dates__spinner spinner">
          <div ref={mainCircleRef} className='spinner__main-circle' 
               style={{ 
                "--count": numberOfEvents, 
                "--angle": angle + "deg", 
                "--time": timeOfRotation + "ms",
                "--delay": timeOfRotation + 300 + "ms",
                } as React.CSSProperties}>
            {
              historicDates.map((item: any, index: any) => {
                const { title } = item;
                const idx = index + 1;
                return (
                  <div key={index} className={"spinner__shoulder " + (currentEvent === index ? 'spinner__shoulder_active' : '')} 
                       style={{ "--i": idx } as React.CSSProperties}
                       onClick={() => loadThis(index)}
                       >
                    <div className='spinner__circle-area'>
                      <p className='spinner__circle'>{idx}
                        <span className='spinner__title'>{title}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
    </div>
  )
};

export default React.memo(DateCircle);
