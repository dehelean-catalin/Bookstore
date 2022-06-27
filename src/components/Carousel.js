import "./Carousel.css";
import React, { useEffect, useState } from "react";
import { SliderData } from "./SliderData";

export const Carousel = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent(current === length - 1 ? 0 : current + 1);
		}, 5000);
		return () => clearInterval(interval);
	}, [current]);

	return (
		<div className="carousel" onClick={nextSlide}>
			{SliderData.map((slide, index) => {
				return (
					<div className={index === current ? "slide-active" : "slide"} key={index}>
						<div className="carousel-container">
							<h3 className="carousel-title">{slide.title}</h3>
							<h3 className="carousel-description">{slide.description}</h3>
						</div>

						<img src={slide.image} className="carousel-image" alt="travel image" />
					</div>
				);
			})}
		</div>
	);
};
