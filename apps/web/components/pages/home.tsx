'use client';

// 3rd party
import React, { useEffect, useRef } from 'react';
import {
  AnimationPlaybackControls,
  motion,
  useAnimate,
  useInView,
} from 'framer-motion';
import {
  Sparkle,
  Layers,
  Cog,
  PartyPopper,
  ArrowDownSquare,
} from 'lucide-react';

// package
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Screen,
  cn,
} from 'ui';

// lib
import { Popsicle, PopsicleChat } from '../assets';
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
      className: 'bg-orange/5',
      icon: <Layers className="text-orange" />,
    },
    button: {
      className: 'text-orange',
    },
  },
  {
    title: "It's Project-Based",
    content:
      '<b>Learn by building, not reading.</b> Project-based learning is essential because it bridges the gap between theory and practice, enabling you to apply knowledge in real-world scenarios.',
    card: {
      className: 'bg-pink/5',
      icon: <Cog className="text-pink" />,
    },
    button: {
      className: 'text-pink',
    },
  },
  {
    title: "It's Fun",
    content:
      "Building stuff is fun, so learning how to build stuff should be fun too. That's why YummyBytes content doesn't take itself too seriously and is heavy on easter eggs.",
    card: {
      className: 'bg-purple/5',
      icon: <PartyPopper className="text-purple" />,
    },
    button: {
      className: 'text-purple',
    },
  },
];

export const Home = () => {
  const screenRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    [...Array(SECTIONS.length)].map(() => React.createRef()),
  );

  return (
    <>
      <Screen className="min-h-[800px] p-10">
        <div className="relative pb-32">
          <Glow />
          <Hero />
        </div>
        <Card className="w-full md:w-1/2 border-0 bg-black/5">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Sparkle className="text-cyan" />
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
          <ArrowDownSquare size={32} className="text-cyan" />
        </Button>
      </Screen>
      {SECTIONS.map(({ title, content, card, button }, i) => (
        <FadingScreen
          key={i}
          ref={screenRefs.current[i]}
          className="overflow-hidden"
        >
          <Card
            className={cn('w-full md:w-1/2 border-0 mb-10', card.className)}
          >
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
              <ArrowDownSquare size="32" className={button.className} />
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
      className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple to-pink opacity-20"
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

const Hero = () => {
  const [scope, animate] = useAnimate();
  const animation = useRef<AnimationPlaybackControls>();

  return (
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
            <Button variant="pink" size="lg">
              Get Started
            </Button>
          </GetStarted>
        </div>
      </div>
      <div className="hidden md:block w-2/5">
        <motion.div
          whileHover={{
            opacity: 0.8,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
          }}
          className="w-28 mx-auto"
        >
          <Popsicle
            className="relative"
            onClick={() => {
              if (animation.current) {
                animation.current.play();
              } else {
                animation.current = animate(
                  scope.current,
                  {
                    opacity: 1,
                    x: 0,
                    y: 0,
                  },
                  {
                    type: 'spring',
                    stiffness: 500,
                    damping: 20,
                  },
                );
              }
            }}
          >
            <motion.div
              ref={scope}
              initial={{ opacity: 0, x: -20, y: 20 }}
              className="absolute -z-10 -top-[42px] -right-[42px]"
            >
              <PopsicleChat className="w-16" />
            </motion.div>
          </Popsicle>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * FadingScreen
 */

const FadingScreen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const target = useRef(null);
  const isAllInView = useInView(target, { amount: 'all' });
  const isSomeInView = useInView(target, { amount: 'some' });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isAllInView) {
      animate(
        scope.current,
        { opacity: 1, scale: 1, y: 0 },
        { type: 'spring', stiffness: 100, damping: 20 },
      );
    } else if (!isSomeInView) {
      animate(
        scope.current,
        { opacity: 0, scale: 1.2, y: 50 },
        { duration: 0 },
      );
    }
  }, [isAllInView, isSomeInView, scope, animate]);

  return (
    <Screen ref={ref} {...props}>
      <div ref={target}>
        <motion.div
          ref={scope}
          initial={{ opacity: 0, scale: 1.2, y: 50 }}
          className="flex flex-col items-center"
        >
          {children}
        </motion.div>
      </div>
    </Screen>
  );
});
FadingScreen.displayName = 'FadingScreen';
