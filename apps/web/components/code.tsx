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
