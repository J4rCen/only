import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './sliderHistory.scss';


interface SliderHistoryProps {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  currentEvent: number;
  historicDates: any[];
}

const SliderHistory: React.FC<SliderHistoryProps> = ({
  sliderRef,
  currentEvent,
  historicDates,
}) => {
  return (
    <div ref={sliderRef} className="historic-dates__slider slider">
      <p className='slider__mobile-title'>{historicDates[currentEvent].title}</p>
      <button className='slider__btn slider__btn_prev'></button>
      {
        <Swiper
          modules={[Navigation]}
          spaceBetween={80}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 25
            },
            769: {
              slidesPerView: 3,
              spaceBetween: 80
            },
            1025: {
              slidesPerView: 4,
              spaceBetween: 80
            }
          }}
          navigation={{
            prevEl: '.slider__btn_prev',
            nextEl: '.slider__btn_next',
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {
            historicDates[currentEvent].events
            .map((item: any, index: any) => {
              const { date, description } = item;
                return (
                  <SwiperSlide key={index} className='slider__slide'>
                    <p className='slider__year'>{date}</p>
                    <p className='slider__description'>{description}</p>
                  </SwiperSlide>
                );
            })
          }
        </Swiper>
      }
    <button className='slider__btn slider__btn_next'></button>  
    </div>
  )
}

export default React.memo(SliderHistory)