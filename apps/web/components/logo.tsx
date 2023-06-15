'use client';

// 3rd party
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useAnimate, AnimationPlaybackControls } from 'framer-motion';

// lib
import { Popsicle } from './assets';

export const Logo = () => {
  const [scope, animate] = useAnimate();
  const animation = useRef<AnimationPlaybackControls>();

  useEffect(() => {
    if (scope.current) {
      animation.current = animate(
        scope.current,
        { rotate: 360 },
        { autoplay: false },
      );
    }
  }, [animate, scope]);

  return (
    <div className="relative flex items-center gap-3">
      <div className="absolute -z-10 top-0 -left-2 w-10 h-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500 to-pink-500 blur-xl" />
      <Link href="/" className="w-8">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ y: 1 }}
          onTap={() => animation.current?.play()}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
          }}
          ref={scope}
        >
          <Popsicle />
        </motion.div>
      </Link>
      <Link
        href="/"
        className="font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-sky-300 to-yellow-300 hover:opacity-75 relative active:top-px"
      >
        YummyBytes
      </Link>
    </div>
  );
};
