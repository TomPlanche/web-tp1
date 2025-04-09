import "./Header.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";
import { incrementTheme, themeStore } from "../../stores/themeStore.ts";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Header component
 * @return JSX.Element
 * @constructor
 **/
const Header = () => {
	// States
	const [isAnimating, setIsAnimating] = useState(false);

	// Refs
	const button = useRef<HTMLButtonElement>(null);
	const timelineRef = useRef<GSAPTimeline>(null);

	// Initialize timeline
	useEffect(() => {
		timelineRef.current = gsap.timeline({
			paused: true,
			onStart: () => {
				setIsAnimating(true);
			},
			onComplete: () => {
				setIsAnimating(false);
			},
		});

		return () => {
			if (timelineRef.current) {
				timelineRef.current.kill();
			}
		};
	}, []);

	// Methods
	const handleMouseEnter = () => {
		if (isAnimating || !button.current) {
			return;
		}

		timelineRef.current?.clear();
		timelineRef.current?.to(button.current, {
			rotate: 12,
			duration: 0.2,
		});

		timelineRef.current?.play();
	};

	const handleMouseLeave = () => {
		if (!button.current) {
			return;
		}

		timelineRef.current?.clear();
		timelineRef.current?.to(button.current, {
			rotate: 0,
			duration: 0.2,
		});

		timelineRef.current?.play();
	};

	const handleClick = () => {
		if (isAnimating || !button.current) {
			return;
		}

		themeStore.dispatch(incrementTheme());

		timelineRef.current?.clear();
		timelineRef.current
			?.to(button.current, {
				rotation: 360,
				duration: 0.5,
				ease: "power2.out",
			})
			.to(button.current, {
				rotation: 0,
				duration: 0,
			});

		timelineRef.current?.play();
	};

	const handleLinkClick = (target: string) => {
		gsap.to(window, { duration: 2, scrollTo: target, ease: "power2.out" });
	};

	return (
		<header>
			<h1>Tom Planche</h1>

			<div className="left">
				<nav>
					<ul>
						<li>
							<span
								onClick={() => handleLinkClick("#projects")}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleLinkClick("#projects");
									}
								}}
							>
								Projects
							</span>
						</li>
					</ul>
				</nav>

				<button
					type="button"
					ref={button}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={handleClick}
					aria-label="Toggle theme change"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						role="img"
						aria-labelledby="title"
					>
						<title id="title">Icon for theme change</title>&aq
						<path
							fill="currentColor"
							d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2z"
						/>
					</svg>
				</button>
			</div>
		</header>
	);
};

// END COMPONENT =======================================================================================  END COMPONENT

export default Header;
