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
			console.log("lala");
		}, 5000);
		return () => clearInterval(interval);
	}, [current]);

	return (
		<section className="carousel" onClick={nextSlide}>
			{SliderData.map((slide, index) => {
				return (
					<div className={index === current ? "slide-active" : "slide"} key={index}>
						<div>Titlu</div>
						<div>lorem loremfdqew9c8nwq9di</div>
						<img src={slide.image} alt="travel image" className="image" />
					</div>
				);
			})}
		</section>
	);
};
