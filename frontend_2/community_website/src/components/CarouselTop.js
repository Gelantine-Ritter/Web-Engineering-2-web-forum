import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';

import slide1 from '../pics/slide.jpg'; 
import slide2 from '../pics/slide_2a.jpg'; 
import slide3 from '../pics/slide_3a.jpg'; 

import RegisterButton from './RegisterButton'


class CarouselTop extends Component {
    render(){
    return(
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Mach jetzt mit und tauche ein in die digitale Welt</h1>
              <h3>Ein Ort für Mädchen und Frauen rund um Coding & Technology</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide2}
              alt="Third slide"
            />
          <Carousel.Caption>
              <h1>Frickeln und Basteln im Online Makerspace</h1>
              <h3>Workshops, Challenges und Anleitungen zum mitmachen</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3}
            alt="Third slide"
          />
         <Carousel.Caption>
            <h1>Werde Teil der Community</h1>
            <h3>Triff neue Leute, teile deine Ideen und tausche dich aus</h3>
         <RegisterButton />
        </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
      )      
    }
}

export default CarouselTop