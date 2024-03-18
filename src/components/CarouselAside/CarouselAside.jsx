import Carousel from 'react-bootstrap/Carousel';


export default function CarouselAside({ images, carouselTitle }) {

    return (
        <div>
            <h2>{carouselTitle}</h2>
            <Carousel>
                {images.map((image, index) => {
                    return (
                        <Carousel.Item key={index} interval={1500}>
                            <img
                                className="w-100 rounded-3"
                                src={image}
                                alt="event/player image"
                            />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>

    )
}