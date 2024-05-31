import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Scrollbar } from "swiper/modules";

import EventSliderItem from './EventSliderItem';

// Css styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../../../styles/events/eventListSlider.css';


export default function EventListSlider({ events, }) {
    return (
        <Swiper
            scrollbar={{
                hide: true
            }}
            cssMode={true}
            navigation={true}
            mousewheel={true}
            modules={[Navigation, Mousewheel, Scrollbar]}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 640px
                600: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 15
                }
            }}
        >
            {events.map((event, index) => (
                <SwiperSlide key={index} style={{
                    display: "flex",
                    padding: 2
                }}>
                    <EventSliderItem
                        id={event._id}
                        name={event.name}
                        image={event.image}
                    />

                </SwiperSlide>
            ))}
        </Swiper >
    )
}

