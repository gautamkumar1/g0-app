"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(SplitText, useGSAP);

interface HeroProps {
	title: string;
	description: string;
	badgeText?: string;
	badgeLabel?: string;
	ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
	microDetails?: Array<string>;
}

const SyntheticHero = ({
	title = "An experiment in light, motion, and the quiet chaos between.",
	description = "Experience a new dimension of interaction — fluid, tactile, and alive. Designed for creators who see beauty in motion.",
	badgeText = "React Three Fiber",
	badgeLabel = "Experience",
	ctaButtons = [
		{ text: "Explore the Canvas", href: "#explore", primary: true },
		{ text: "Learn More", href: "#learn-more" },
	],
	microDetails = [
		"Immersive shader landscapes",
		"Hand-tuned motion easing",
		"Responsive, tactile feedback",
	],
}: HeroProps) => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const paragraphRef = useRef<HTMLParagraphElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const microRef = useRef<HTMLUListElement | null>(null);

	useGSAP(
		() => {
			if (!headingRef.current) return;

			document.fonts.ready.then(() => {
				const split = new SplitText(headingRef.current!, {
					type: "lines",
					wordsClass: "hero-lines",
				});

				gsap.set(split.lines, {
					filter: "blur(16px)",
					yPercent: 24,
					autoAlpha: 0,
					scale: 1.04,
					transformOrigin: "50% 100%",
				});

				if (paragraphRef.current) {
					gsap.set(paragraphRef.current, { autoAlpha: 0, y: 8 });
				}
				if (ctaRef.current) {
					gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
				}

				const microItems = microRef.current
					? Array.from(microRef.current.querySelectorAll("li"))
					: [];
				if (microItems.length > 0) {
					gsap.set(microItems, { autoAlpha: 0, y: 6 });
				}

				const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

				tl.to(
					split.lines,
					{
						filter: "blur(0px)",
						yPercent: 0,
						autoAlpha: 1,
						scale: 1,
						duration: 0.9,
						stagger: 0.12,
					},
					0.1,
				);

				if (paragraphRef.current) {
					tl.to(
						paragraphRef.current,
						{ autoAlpha: 1, y: 0, duration: 0.5 },
						"-=0.55",
					);
				}

				if (ctaRef.current) {
					tl.to(
						ctaRef.current,
						{ autoAlpha: 1, y: 0, duration: 0.5 },
						"-=0.35",
					);
				}

				if (microItems.length > 0) {
					tl.to(
						microItems,
						{ autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
						"-=0.25",
					);
				}
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			className="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
		>
			<div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mx-auto -mt-[106px] md:-mt-[80px]">
				<h1
					ref={headingRef}
					className="text-3xl md:text-5xl max-w-4xl font-normal tracking-tight text-white mb-3 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
					aria-label={title}
				>
					{title}
				</h1>

				<p
					ref={paragraphRef}
					className="text-muted-foreground text-base max-w-2xl mx-auto mb-6 font-light"
				>
					{description}
				</p>

				<div
					ref={ctaRef}
					className="flex flex-wrap items-center justify-center gap-3"
				>
					{ctaButtons.map((button, index) => {
						const isPrimary = button.primary ?? index === 0;
						const classes = isPrimary
							? "px-6 py-2.5 rounded-xl text-sm font-medium backdrop-blur-lg bg-primary/80 hover:bg-primary/90 shadow-lg transition-all cursor-pointer"
							: "px-6 py-2.5 rounded-xl text-sm font-medium border-border text-foreground hover:bg-muted/50 backdrop-blur-lg transition-all cursor-pointer";

						if (button.href) {
							return (
								<a key={index} href={button.href} className="inline-block">
									<Button variant={isPrimary ? undefined : "outline"} className={classes}>
										{button.text}
									</Button>
								</a>
							);
						}

						return (
							<Button
								key={index}
								variant={isPrimary ? undefined : "outline"}
								className={classes}
							>
								{button.text}
							</Button>
						);
					})}
				</div>

				{microDetails.length > 0 && (
					<ul
						ref={microRef}
						className="mt-5 flex flex-wrap justify-center gap-4 text-xs font-light tracking-tight text-muted-foreground"
					>
						{microDetails.map((detail, index) => (
							<li key={index} className="flex items-center gap-2">
								<span className="h-1 w-1 rounded-full bg-primary/60" />
								{detail}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default SyntheticHero;
