import { Paper } from "@mui/material";
import HistoryProductSliderItem from "./HistoryProductSliderItem";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Scrollbar } from "swiper/modules";

// Css styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../../../styles/products/historyListSilder.css'

export default function ProductHistoryListSlider({ recentlyViewedItems }) {
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
                    slidesPerView: 4,
                    spaceBetween: 15
                }
            }}
        >
            {recentlyViewedItems.map((recentlyViewedItem, index) => (
                <SwiperSlide key={index} style={{
                    display: "flex",
                    padding: 2
                }}>
                    <Paper sx={{
                        flexGrow: 1,
                        paddingX: 1,
                        paddingY: 1.5,
                    }}>
                        <HistoryProductSliderItem
                            id={recentlyViewedItem?.item?.object_id}
                            name={recentlyViewedItem?.item?.name}
                            imageUrl={recentlyViewedItem?.item?.image}
                            originalPrice={recentlyViewedItem?.item?.price}
                            discountedPrice={recentlyViewedItem?.item?.discounted_price}
                            discountPercentage={
                                recentlyViewedItem?.item?.discount_percentage > 0 ?
                                    recentlyViewedItem?.item?.discount_percentage : null
                            }
                        />
                    </Paper>
                </SwiperSlide>
            ))}
        </Swiper >
    );
}