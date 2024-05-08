import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.css'; // Make sure the path to the CSS file is correct
// import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    cssEase: 'cubic-bezier(0.23, 1, 0.32, 1)',
  };

  return (
    <Slider {...settings}>
                      <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://www.caketella.com/wp-content/uploads/2020/11/Screenshot-2021-02-02-154939.jpg"
                  alt="Instruction 1"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 1</h1><br/>
                  <p className={styles.ctext}>לחץ התחל את המשחק</p>
                </div>
              </div>
            </div>

            <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://media.istockphoto.com/id/859461826/vector/happy-smiling-drunk-man-character-laying-on-bar-floor-funny-party-concept.jpg?s=612x612&w=0&k=20&c=k58L_kF6zJ8q6T66arE6CF0_Kc0tS-Ad_ShGR-SIUIA="
                  alt="Instruction 7"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 7</h1><br/>
                  <p className={styles.ctext}>חזור חלילה עד שאחד המשתתפים שיכור</p>
                </div>
              </div>
            </div>

            <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://previews.123rf.com/images/mitand73/mitand731905/mitand73190500034/122093942-six-shots-of-vodka-in-a-row-copy-space.jpg"
                  alt="Instruction 6"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 6</h1><br/>
                  <p className={styles.ctext}>בחר קטגוריה אחרת או השאר בקטגוריה הנוכחית</p>
                </div>
              </div>
            </div>

            <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-176650516-1539615049.jpg?crop=0.917xw:0.993xh;0.0391xw,0&resize=1200:*"
                  alt="Instruction 5"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 5</h1><br/>
                  <p className={styles.ctext}>אם ענית נכון העבר את השאלה הבאה לחבר ואם ענית לא נכון תיקח שלוק מהבירה</p>
                </div>
              </div>
            </div>

            <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://thumbs.dreamstime.com/z/four-shots-vodka-photo-against-white-background-57581744.jpg?w=992"
                  alt="Instruction 4"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 4</h1><br/>
                  <p className={styles.ctext}>ענה על השאלה</p>
                </div>
              </div>
            </div>

            <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://www.healthdigest.com/img/gallery/what-youre-doing-to-your-body-if-you-drink-vodka-every-night/intro-1623258916.jpg"
                  alt="Instruction 3"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 3</h1><br/>
                  <p className={styles.ctext}>בחר קטגוריה</p>
                </div>
              </div>
            </div>

            <div className={styles.ci}>
              <div className={styles.card}>
                <img
                  className={styles.img}
                  src="https://image.shutterstock.com/image-photo/vodka-shot-glasses-on-rustic-260nw-517995652.jpg"
                  alt="Instruction 2"
                />
              </div>
              <div className={styles.cbody}>
                <div className={styles.textContainer}>
                  <h1 className={styles.ctitle}>הוראה 2</h1><br/>
                  <p className={styles.ctext}>הכנס שם מלא ואת שם הבר</p>
                </div>
              </div>
            </div>
    </Slider>
  );
};

export default Carousel;
