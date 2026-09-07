"use client";
import * as React from "react";
import Image from "next/image";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
	/**
	 * Height of the scroll section in pixels
	 * @default 1500
	 */
	scrollHeight: number;
	/**
	 * Background image URL for desktop view
	 */
	desktopImage: string;
	/**
	 * Background image URL for mobile view
	 */
	mobileImage: string;
	/**
	 * Initial clip path percentage
	 * @default 25
	 */
	initialClipPercentage: number;
	/**
	 * Final clip path percentage
	 * @default 75
	 */
	finalClipPercentage: number;
	/**
	 * Alt text for the background image
	 */
	imageAlt: string;
}

interface iISmoothScrollHeroBackgroundProps extends iISmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<
	iISmoothScrollHeroBackgroundProps
> = ({
	scrollHeight,
	desktopImage,
	mobileImage,
	initialClipPercentage,
	finalClipPercentage,
	imageAlt,
}) => {
	const {scrollY} = useScroll();

	// Finish the reveal (clip + zoom) before the sticky panel unpins, so the
	// full image is shown completely (and rests briefly) before content scrolls in.
	const revealEnd = scrollHeight * 0.78;

	const clipStart = useTransform(
		scrollY,
		[0, revealEnd],
		[initialClipPercentage, 0],
	);
	const clipEnd = useTransform(
		scrollY,
		[0, revealEnd],
		[finalClipPercentage, 100],
	);

	// Reveal only vertically at full width — no left/right paper strips during scroll.
	const clipPath = useMotionTemplate`polygon(0% ${clipStart}%, 100% ${clipStart}%, 100% ${clipEnd}%, 0% ${clipEnd}%)`;

	// Zoom out to 1x as the user scrolls. 1.45 keeps the reveal effect while
	// staying within the source resolution (higher zoom made the start blurry).
	const scale = useTransform(scrollY, [0, revealEnd], [1.45, 1]);

	return (
		<motion.div
			className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--paper)]"
			style={{
				clipPath,
				willChange: "transform, opacity",
			}}
		>
			{/* Mobile image */}
			<motion.div
				className="absolute inset-0 md:hidden"
				style={{scale, transformOrigin: "85% 12%"}}
			>
				<Image
					src={mobileImage}
					alt={imageAlt}
					fill
					priority
					quality={90}
					sizes="100vw"
					className="object-cover object-[85%_12%]"
				/>
			</motion.div>
			{/* Desktop image */}
			<motion.div
				className="absolute inset-0 hidden md:block"
				style={{scale, transformOrigin: "50% 12%"}}
			>
				<Image
					src={desktopImage}
					alt={imageAlt}
					fill
					priority
					quality={90}
					sizes="100vw"
					className="object-cover object-[50%_12%]"
				/>
			</motion.div>
		</motion.div>
	);
};

/**
 * A smooth scroll hero component with parallax background effect
 * @param props - Component props
 * @returns React component
 */
 const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage,
	mobileImage,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
	imageAlt,
}) => {
	return (
		<div
			style={{height: `calc(${scrollHeight}px + 100vh)`}}
			className="relative w-full"
		>
			<SmoothScrollHeroBackground
				scrollHeight={scrollHeight}
				desktopImage={desktopImage}
				mobileImage={mobileImage}
				initialClipPercentage={initialClipPercentage}
				finalClipPercentage={finalClipPercentage}
				imageAlt={imageAlt}
			/>
		</div>
	);
};
export default SmoothScrollHero;
