import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {data?.map((movie) => (
        <div key={movie._id} style={{ width: 320, padding: '0 1.5rem', boxSizing: 'border-box' }}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderUtil;
