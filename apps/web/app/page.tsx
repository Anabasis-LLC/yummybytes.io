// package
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'ui';

// lib
import { Code } from '../components/code';
import { Popsicle } from '../components/assets';

const SNIPPET = `
'use client';

// 3rd party
import { Highlight, themes } from 'prism-react-renderer';

/**
 * Code
 */

export type CodeProps = {
  code: string;
  language: 'tsx' | 'jsx';
};

export const Code = ({ code, language }: CodeProps) => {
  return (
    <div className="border border-black/10 p-3">
      <Highlight theme={themes.dracula} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="text-sm" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="text-muted mr-3">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

`.trim();

/**
 * Page
 */

export default function Page() {
  return (
    <div className="relative">
      <div
        className="absolute top-0 right-0 -z-10 transform-gpu overflow-hidden blur-3xl"
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
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-row gap-10 w-9/12">
          <div className="w-2/3">
            <h1 className="text-4xl font-serif mb-5">
              Learn to code with <span className="text-primary">tasty</span> and{' '}
              <span className="text-secondary">byte-sized</span> recipes.
            </h1>
            <h2 className="text-lg font-semibold">
              Level up your programming skills with content that tastes good and
              is good for you 🙃.
            </h2>
          </div>
          <div className="w-1/3">
            <div className="w-28 mx-auto">
              <Popsicle />
            </div>
          </div>
        </div>
        <Button variant="secondary" size="lg" className="text-lg">
          Get Started
        </Button>
        <div className="flex flex-row gap-10 w-9/12">
          <Card className="w-1/3 bg-black/10 border-0">
            <CardHeader>
              <CardTitle>Full Stack</CardTitle>
              <CardDescription>Bar</CardDescription>
            </CardHeader>
            <CardContent>Baz</CardContent>
          </Card>
          <Card className="w-1/3 bg-black/10 border-0">
            <CardHeader>
              <CardTitle>Practical</CardTitle>
              <CardDescription>Bar</CardDescription>
            </CardHeader>
            <CardContent>Baz</CardContent>
          </Card>
          <Card className="w-1/3 bg-black/10 border-0">
            <CardHeader>
              <CardTitle>Project-Based</CardTitle>
              <CardDescription>Bar</CardDescription>
            </CardHeader>
            <CardContent>Baz</CardContent>
          </Card>
        </div>
        <Code code={SNIPPET} language="tsx" />
      </div>
    </div>
  );
}
