import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper/modules';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Fragment, useState } from 'react';
import Thumbnail from './Thumbnail';


// Css styles
import 'swiper/css';
import './styles.css';
import 'swiper/css/navigation';


export default function ImageViewer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swiperState, setSwiperState] = useState(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    let images = [
        // "https://dny8w8p9zw6ef.cloudfront.net/products/65d7650f5c997138b6197c79_0.jpg",
        // "https://dny8w8p9zw6ef.cloudfront.net/products/65d7650f5c997138b6197c79_1.jpg",
        // "https://dny8w8p9zw6ef.cloudfront.net/products/65d7650f5c997138b6197c79_2.jpg",
        // "https://dny8w8p9zw6ef.cloudfront.net/products/65d7650f5c997138b6197c79_3.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_0.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_1.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_2.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_3.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_4.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_5.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_6.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_8.jpg",
        "https://dny8w8p9zw6ef.cloudfront.net/products/65974549d9ded52fecd5d7d9_9.jpg"
    ];

    const onHoverThumbnail = (position) => {
        setCurrentIndex(position);
    };

    const thumbs = images.map((image, index) => (
        <Fragment key={`thumb-${index}`}>
            <Box>
                <SwiperSlide key={`swiper-${index}`}>
                    <Thumbnail
                        active={index === currentIndex}
                        onHoverThumbnail={() => onHoverThumbnail(index)}
                        path={image}
                    />
                </SwiperSlide>
            </Box>
        </Fragment>
    ));





    return (
        <Box display="flex" justifyContent="center">
            <Box
                sx={{
                    ml: 3,
                    height: isMobile ? '570px' : '590px',
                    width: "fit-content",
                    maxWidth: isMobile ? '200px' : '275px'
                }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                    <IconButton
                        size='large'
                        color="primary"
                        onClick={() => swiperState?.slidePrev()}
                        disabled={isBeginning}
                        sx={{
                            transform: 'rotate(-90deg)'
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
                <Swiper
                    modules={[Scrollbar, Mousewheel]}
                    mousewheel={true}
                    scrollbar={{ draggable: true, hide: false }}
                    onSwiper={setSwiperState}
                    onSlideChangeTransitionStart={() => {
                        setIsBeginning(swiperState?.isBeginning);
                        setIsEnd(swiperState?.isEnd);
                    }}
                    slidesPerView={4}

                    spaceBetween={12}
                    direction={'vertical'}
                    className="mySwiper"
                    style={{
                        width: "fit-content",
                        height: isMobile ? '300px' : '400px'
                    }}
                >
                    {thumbs}
                </Swiper>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                    <IconButton
                        size='large'
                        color="primary"
                        onClick={() => swiperState?.slideNext()}
                        disabled={isEnd}
                        sx={{
                            transform: 'rotate(90deg)'
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{
                ml: 3.5,
                boxShadow: 3,
                width: isMobile ? '100%' : "350px",
                height: isMobile ? "100%" : "300px",
                maxWidth: isMobile ? '100%' : "500px",
                minWidth: "200px",
                padding: 3,
                
                transform: "translate(0, 20%)"
            }} display="flex" alignItems="center" justifyContent="center">
                <img src={images[currentIndex]} alt='No img available' style={{
                    objectFit: 'scale-down',
                    width: isMobile ? '100%' : "350px",
                    height: isMobile ? 'auto' : "300px"
                }} />
            </Box>
        </Box>
    );
};


