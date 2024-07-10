
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 

const bannerData = [
    { id: 1, url: 'https://assets.ajio.com/medias/sys_master/images/images/h26/h19/32799544213534/05062021-M-DressesPage-topbanner-shopalldresses.jpg' },
    { id: 2, url: 'https://www.berrylush.com/cdn/shop/files/catagory_banner_10_e890cd0c-a66a-4b3f-bc60-13c5753b348a.jpg?v=1710148571' },
    { id: 3, url: 'https://cdn.shopify.com/s/files/1/0612/0538/1284/files/Mobile_banner_12_500x.jpg?v=1712305743' },
];

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const MainContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh', // Set minimum height to full viewport height
    paddingTop: '60px', // Adjust based on header height
});


const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 'auto', // Auto adjust height
    [theme.breakpoints.down('sm')]: {
        height: '250px', // Adjust height for smaller screens
    }
}));

const Gif = styled('img')({
    width: '100%',
    height: 'auto', // Auto adjust height
    marginBottom: '20px', // Add margin between gifs
});

const MainComponent = () => {
    return (
        <div>
            
            
            <MainContainer>
                <Container fluid>
                    <Row>
                        <Col>
                            <Carousel
                                swipeable={true} 
                                draggable={true} 
                                responsive={responsive}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={4000}
                                keyBoardControl={true}
                                showDots={true}
                                slidesToSlide={1}
                                containerClass="carousel-container"
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                {bannerData.map(image => (
                                    <Image src={image.url} alt="banner" key={image.id} />
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Gif src="https://m.twentydresses.com//assests/images/just_in_mobile.gif" alt="Shopping Gif 1" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Gif src="https://assets.ajio.com/cms/AJIO/MOBILE/09112023-FoundryStore-M-Z1-topbanner-sequinstarlet.gif" alt="Shopping Gif 2" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Gif src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/031309137416145.620b12d4b3181.gif" alt="Shopping Gif 3" />
                        </Col>
                    </Row>
                </Container>
            </MainContainer>
        </div>
    );
}

export default MainComponent;