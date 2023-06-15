'use client';

// package
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  cn,
} from 'ui';
import { useWindowScroll } from 'hooks';

// lib
import { Logo } from './logo';

export const Header = () => {
  const [position] = useWindowScroll();
  const isDetached = position.y > 0;

  return (
    <div
      className={cn('sticky z-10 top-0', {
        'bg-header/90 backdrop-blur-md border-b border-black/10': isDetached,
      })}
    >
      <div className="container flex items-center justify-between h-20">
        <Logo />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary" className="font-extrabold">
              Get Started
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
