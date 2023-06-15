// 3rd party
import { ReactNode } from 'react';

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
} from 'ui';

// lib
import { Popsicle } from './assets';

/**
 * Shell
 */

export type ShellProps = {
  children: ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="sticky z-10 top-0 bg-header/90 backdrop-blur-md py-5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="relative flex items-center gap-2">
            <div className="absolute -z-10 top-0 -left-2 w-10 h-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500 to-pink-500 blur-xl" />
            <div className="w-8">
              <Popsicle />
            </div>
            <div className="font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-sky-300 to-yellow-300">
              YummyBytes
            </div>
          </div>
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
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers!
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
      <div className="py-5">
        <div className="container mx-auto">{children}</div>
      </div>
      <div className="grow bg-footer py-5">
        <div className="container mx-auto">
          <div className="text-xs text-foreground/25 font-semibold">
            ©2023 Anabasis Labs
          </div>
        </div>
      </div>
    </div>
  );
};
