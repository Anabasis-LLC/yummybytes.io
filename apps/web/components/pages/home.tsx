'use client';

// 3rd party
import React, { useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Sparkle, Layers, ArrowDownSquare } from 'lucide-react';

// package
import { Button, Card, CardContent, CardHeader, CardTitle, Screen } from 'ui';

// lib
import { Popsicle } from '../assets';
import { GetStarted } from '../get-started';

/**
 * Home
 */

const SECTIONS = [
  {
    title: "It's Full Stack",
    content:
      '<b>Learn how all of the pieces fit.</b> Exposure to every layer of an application gives you the foundation needed to truly understand how and why things work and take your skills to the next level.',
    card: {
      style: { backgroundColor: 'rgba(255, 184, 108, 0.1)' },
      icon: <Layers className="text-primary" color="rgb(255, 184, 108)" />,
    },
    button: {
      style: { color: 'rgb(255, 184, 108)' },
    },
  },
  {
    title: "It's Project-Based",
    content:
      '<b>Learn by building, not reading.</b> Project-based learning is essential because it bridges the gap between theory and practice, enabling you to apply knowledge in real-world scenarios.',
    card: {
      style: { backgroundColor: 'rgba(255, 121, 198, 0.1)' },
      icon: <Layers className="text-primary" color="rgb(255, 121, 198)" />,
    },
    button: {
      style: { color: 'rgb(255, 121, 198)' },
    },
  },
  {
    title: "It's Fun",
    content:
      "Building stuff is fun, so learning how to build stuff should be fun too. That's why YummyBytes content doesn't take itself too seriously and is heavy on easter eggs.",
    card: {
      style: { backgroundColor: 'rgba(189, 147, 249, 0.1)' },
      icon: <Layers className="text-primary" color="rgb(189, 147, 249)" />,
    },
    button: {
      style: { color: 'rgb(189, 147, 249)' },
    },
  },
];

export const Home = () => {
  const screenRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    [...Array(SECTIONS.length)].map(() => React.createRef()),
  );

  return (
    <>
      <Screen className="min-h-[1000px] p-10">
        <div className="relative pb-32">
          <Glow />
          <Hero />
        </div>
        <Card
          className="w-full md:w-1/2 border-0"
          style={{ backgroundColor: 'rgba(68, 71, 90, 0.1)' }}
        >
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Sparkle className="text-primary" color="rgb(139, 233, 253)" />
                <span>Why YummyBytes? What&apos;s different?</span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Button
          variant="link"
          onClick={() =>
            screenRefs.current[0].current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
          className="mt-10 animate-bounce"
        >
          <ArrowDownSquare size={32} color="rgb(139, 233, 253)" />
        </Button>
      </Screen>
      {SECTIONS.map(({ title, content, card, button }, i) => (
        <FadingScreen
          key={i}
          ref={screenRefs.current[i]}
          className="overflow-hidden p-10 border border-b-red-50"
        >
          <Card className="w-full md:w-1/2 border-0 mb-10" style={card.style}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  {card.icon}
                  <span>{title}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-300">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </Card>
          {i === SECTIONS.length - 1 ? (
            <GetStarted>
              <Button variant="link" size="lg">
                Let&apos;s Go!
              </Button>
            </GetStarted>
          ) : (
            <Button
              variant="link"
              onClick={() =>
                screenRefs.current[i + 1].current?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              <ArrowDownSquare size="32" style={button.style} />
            </Button>
          )}
        </FadingScreen>
      ))}
    </>
  );
};

/**
 * Glow
 */

const Glow = () => (
  <div
    className="absolute -top-20 right-0 -z-20 transform-gpu overflow-hidden blur-3xl"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-20"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    ></div>
  </div>
);

/**
 * Hero
 */

const Hero = () => (
  <div className="flex flex-row items-center">
    <div className="w-full md:w-3/5">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-serif">
          Learn to code with tasty recipes & tutorials.
        </h1>
        <h2 className="text-lg font-semibold">
          Level up your programming skills with byte-sized content that tastes
          good and is good for you.
          <span className="text-2xl ml-1">😋</span>
        </h2>
        <GetStarted>
          <Button variant="secondary" size="lg">
            Get Started
          </Button>
        </GetStarted>
      </div>
    </div>
    <div className="hidden md:block w-2/5">
      <Popsicle className="w-28 mx-auto" />
    </div>
  </div>
);

/**
 * FadingScreen
 */

const FadingScreen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const target = useRef(null);

  const { scrollYProgress } = useScroll({
    target,
    // Progress starts when when the "start" of the target reaches the "end"
    // of the container.
    // Progress ends when the "start" of the target reaches the "center" of
    // the container.
    // https://www.framer.com/motion/use-scroll/##scroll-offsets
    offset: ['start end', 'start center'],
  });

  const scale = useTransform(
    scrollYProgress,
    (progress) => 1.0 + -0.1 * (1.0 - progress),
  );

  return (
    <Screen ref={ref} {...props}>
      <div ref={target}>
        <motion.div
          style={{ opacity: scrollYProgress, scale }}
          className="flex flex-col items-center"
        >
          {children}
        </motion.div>
      </div>
    </Screen>
  );
});
FadingScreen.displayName = 'FadingScreen';
