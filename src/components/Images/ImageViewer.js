import { Box, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Mousewheel } from 'swiper/modules';
import { Fragment, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Custom components
import Thumbnail from './Thumbnail';


// Css styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';


export default function ImageViewer({ images,currentImage, setCurrentImage }) {
    const slidesPerView = 4;

    
    const [swiperInstance, setSwiperInstance] = useState(null);

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(images?.length <= slidesPerView);

    const onClickThumbnail = (position) => {
        setCurrentImage(position);
    };

    const thumbs = images.map((image, index) => (
        <Fragment key={`thumb-${index}`}>
            <Box>
                <SwiperSlide key={`swiper-${index}`}>
                    <Thumbnail
                        active={index === currentImage}
                        onClickThumbnail={() => onClickThumbnail(index)}
                        path={image}
                    />
                </SwiperSlide>
            </Box>
        </Fragment>
    ));

    return (
        <Box display="flex" pr={0} height="inherit" justifyItems="center" width="inherit">
            <Box className="img-scrollbar">
                <Box display="flex" justifyContent="center" alignItems="center" sx={{
                    mb: 1,
                }}>
                    <IconButton
                        color="primary"
                        onClick={() => swiperInstance?.slidePrev()}
                        disabled={isBeginning}
                        sx={{
                            transform: 'rotate(-90deg)',
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
                <Swiper
                    modules={[Scrollbar, Mousewheel]}
                    mousewheel={true}
                    scrollbar={{ draggable: true, hide: false }}
                    onSwiper={setSwiperInstance}
                    onSlideChangeTransitionStart={() => {
                        setIsBeginning(swiperInstance?.isBeginning);
                        setIsEnd(swiperInstance?.isEnd);
                    }}
                    slidesPerView={slidesPerView}

                    spaceBetween={1}
                    direction={'vertical'}
                    className="mySwiper"
                    style={{
                        width: "fit-content",
                        height: "100%",
                    }}
                >
                    {thumbs}
                </Swiper>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton
                        color="primary"
                        onClick={() => swiperInstance?.slideNext()}
                        disabled={isEnd}
                        sx={{
                            transform: 'rotate(90deg)'
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box
                className="image-box"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    ml: 3.5,
                    borderRadius: "15px",
                    mt: "1.5%",
                    alignSelf: "center",
                    
                }}>
                <InnerImageZoom
                    src={images[currentImage]}
                    zoomSrc={images[currentImage]}
                    hideHint
                    className='img-with-zoom-container'
                    zoomScale={0.75}
                    fadeDuration={0}

                    imgAttributes={{
                        alt: 'No available image',
                        className: "img-with-zoom",
                    }}

                />
            </Box>
        </Box>
    );
};


