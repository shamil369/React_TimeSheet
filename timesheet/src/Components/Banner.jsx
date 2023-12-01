import './Banner.css'
import Carousel from 'react-bootstrap/Carousel';


function Banner() {
    return(
            <Carousel>
              <Carousel.Item>
              
                <img className='banner-img' src="https://th.bing.com/th/id/OIP.x3eECjK9YvC1cqp9XWH5wQHaDS?rs=1&pid=ImgDetMain"  ></img>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
               
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
               
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          


    //     <div className="banner">
    //       <img src="https://th.bing.com/th/id/OIP.x3eECjK9YvC1cqp9XWH5wQHaDS?rs=1&pid=ImgDetMain"  ></img>
    //    </div>
    )
}

export default Banner