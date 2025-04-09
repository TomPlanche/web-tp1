import "./App.scss";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrambleTextPlugin } from "./utils/gsap/ScrambleText";

import Header from "./components/Header";
import { NewProject, Project } from "./components/Project";
import { useProjectsStoreSelector } from "./stores/hooks/projectsStoreHooks.ts";

gsap.registerPlugin(ScrambleTextPlugin);

const App = () => {
	// Variables
	const title = "Tom Planche";
	const DELAY_MS = 200;

	// States
	const [introAnimationDone, setIntroAnimationDone] = useState<boolean>(false);
	const projects = useProjectsStoreSelector((state) => state.value);

	// Refs
	const titleRef = useRef<HTMLHeadingElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const titleScrollInterval = useRef<number>(null);

	// Methods
	const getNextTitle = (currentTitle: string): string => {
		if (!currentTitle) {
			throw new Error("Title cannot be empty");
		}
		return currentTitle.slice(1) + currentTitle[0];
	};

	const initTitleScroll = (): void => {
		let currentTitle = "Tom Planche's website ";
		titleScrollInterval.current = setInterval(() => {
			currentTitle = getNextTitle(currentTitle);
			document.title = currentTitle;
		}, DELAY_MS);
	};

	// `useLayoutEffect` is used to ensure that the animation is applied after the DOM has been updated
	useLayoutEffect(() => {
		if (!titleRef.current || !imageRef.current || !paragraphRef.current) {
			return;
		}

		const timeline = gsap.timeline({
			defaults: {
				duration: 0.5,
				ease: "power2.out",
			},
		});

		timeline
			.set(imageRef.current, {
				opacity: 0,
				width: 0,
			})
			.set(paragraphRef.current, {
				opacity: 0,
				height: 0,
			})
			.to(
				titleRef.current,
				{
					scrambleText: {
						text: title,
						chars: title
							.replace(/a/g, "4")
							.replace(/e/g, "3")
							.replace(/o/g, "O"),
						revealDelay: 0.625,
					},
					duration: 1,
				},
				"<",
			)
			.to(imageRef.current, {
				width: "auto",
				duration: 1,
			})
			.to(imageRef.current, {
				opacity: 1,
				duration: 1,
			})
			.to(paragraphRef.current, {
				height: "auto",
				duration: 1,
			})
			.to(paragraphRef.current, {
				opacity: 1,
				duration: 1,

				onComplete: () => {
					setIntroAnimationDone(true);
				},
			});
	}, []);

	// empty `useEffect` to run the title scroll function only once
	useEffect(() => {
		if (!titleRef.current) {
			return;
		}

		initTitleScroll();

		return () => {
			if (titleScrollInterval.current) {
				clearInterval(titleScrollInterval.current);
			}
		};
	});

	return (
		<>
			<div id="noise" />
			<Header />

			<main>
				<section id="intro">
					<div className="left">
						<h1 ref={titleRef}>Tom Planche</h1>
						<p ref={paragraphRef}>
							French Software Engineer, passionate about Rust.
						</p>
					</div>

					<img ref={imageRef} src="/favicon.png" alt="Drawing of me" />
				</section>
				{
					// Check if the intro animation is done before rendering the rest of the page
					introAnimationDone && (
						<section id="projects">
							<h2>Projects</h2>
							<div className="grid">
								{projects.map((project) => (
									<Project key={`${project.title}`} {...project} />
								))}

								<NewProject />
							</div>
						</section>
					)
				}
			</main>
		</>
	);
};

export default App;
