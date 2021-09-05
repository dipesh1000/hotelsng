import React from "react";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";

function HomeTestimonial({ testimonials }) {
  const settings = {
    dots: true,
    infinite: true,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="testimonial">
        <div className="testimonial-slide">
          <Slider {...settings}>
            {testimonials ? (
              testimonials.map((testimonial) => (
                <div className="testimonial-content">
                  <div
                    className="person-image"
                    style={{
                      backgroundImage: `url(${testimonial.image} )`,
                    }}
                  ></div>
                  <div className="person-details">
                    <p>{testimonial.title}</p>
                    {testimonial.designation}
                  </div>
                  <div className="testimonial-text">
                    <p>
                      <em
                        dangerouslySetInnerHTML={{
                          __html: testimonial.description,
                        }}
                      ></em>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="testimonial-content">
                <div className="person-image">
                  <Skeleton circle={true} height={350} />
                </div>
                <div className="person-details">
                  <p>
                    <Skeleton />
                  </p>
                  <Skeleton />
                </div>
                <div className="testimonial-text">
                  <p>
                    <Skeleton width={100} count={2} />
                  </p>
                </div>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default HomeTestimonial;
