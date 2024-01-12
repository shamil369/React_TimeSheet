import './Banner.css'
import Carousel from 'react-bootstrap/Carousel';


function Banner() {
    return(
            <Carousel>
              <Carousel.Item>
             <div className="banner-img-background">

                <img className='banner-img' src="/bannerTime.svg"  ></img>
              </div> 
                <Carousel.Caption className="transform-heading">
                  <h1 className="red fsize">Time Management</h1>
                  <p className="red width-para">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis aliquam ut dolore odit hic ullam tempore harum id.</p>
                 
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="banner-img-background">
                <img className='banner-img' src="/bannerTime.svg"  ></img>
                </div> 
                <Carousel.Caption className="transform-heading" >
                  <h3 className="fsize">Best Way To Manage Your Task</h3>
                  <p className="width-para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat tempora minus accusamus. Quia tempora fuga officiis reiciendis, sint debitis dicta!</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
              <div className="lightblue">
                <img className='banner-img' src="/planningBanner.svg"  ></img>
                </div> 
                <Carousel.Caption className="transform-heading">
                  <h1 className="blueshade fsize">Planning Your Task</h1>
                  <p className="width-para blueshade">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi beatae vel odio. Doloremque, dolores. Praesentium beatae ratione saepe.
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