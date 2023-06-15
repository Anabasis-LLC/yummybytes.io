// 3rd party
import { ReactNode } from 'react';

// lib
import { Header } from './header';
import { Footer } from './footer';

/**
 * Shell
 */

export type ShellProps = {
  children: ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <div className="py-5">
        <div className="container mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
