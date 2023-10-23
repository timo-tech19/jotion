import { useEffect, useState } from "react";

// perform action on scroll at given trigger position
export const useScrollTop = (threshold = 10) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > threshold ? setScrolled(true) : setScrolled(false);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold]);

	return scrolled;
};
