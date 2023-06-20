'use client';

// 3rd party
import Link from 'next/link';

// package
import { Button, cn } from 'ui';
import { useWindowScroll } from 'hooks';

// lib
import { Logo } from './logo';
import { GetStarted } from './get-started';

export const Header = () => {
  const [position] = useWindowScroll();
  const isDetached = position.y > 0;

  return (
    <div
      className={cn('fixed z-10 w-screen', {
        'bg-selection/10 backdrop-blur-md border-b border-black/10': isDetached,
      })}
    >
      <div className="container flex items-center justify-between h-20">
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
              {isDetached && <Button variant="secondary">Get Started</Button>}
            </GetStarted>
          </div>
        </div>
      </div>
    </div>
  );
};
