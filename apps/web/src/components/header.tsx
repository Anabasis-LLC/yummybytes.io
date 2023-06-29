'use client';

// 3rd party
import { useEffect } from 'react';
import Link from 'next/link';
import { useAnimate } from 'framer-motion';

// package
import { Button, cn } from 'ui';
import { useWindowScroll } from 'hooks';

// lib
import { Logo } from './logo';
import { GetStarted } from './get-started';

export const Header = () => {
  const [scope, animate] = useAnimate();
  const [position] = useWindowScroll();
  const isScrolled = position.y > 0;

  useEffect(() => {
    if (isScrolled) {
      animate(scope.current, { height: 80 });
    } else {
      animate(scope.current, { height: 112 });
    }
  }, [isScrolled, scope, animate]);

  return (
    <div
      ref={scope}
      className={cn('fixed z-10 w-screen h-28', {
        'bg-selection/10 backdrop-blur-md border-b border-black/10': isScrolled,
      })}
    >
      <div className="container flex items-center justify-between h-full">
        <Logo />
        <div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/recipes">Recipes</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/projects">Projects</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/snippets">Snippets</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/pro">PRO</Link>
            </Button>
            <GetStarted>
              <Button variant="pink">Get Started</Button>
            </GetStarted>
          </div>
        </div>
      </div>
    </div>
  );
};
