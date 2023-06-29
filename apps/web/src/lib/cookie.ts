// 3rd party
import type { NextRequest } from 'next/server';
import type { CookieSerializeOptions } from 'cookie';

// lib
import { LoggerInstance } from './logger';

// Uncomment to re-calculate the estimated size
// of an empty session cookie:
// import { serialize } from "cookie"
// console.log(
//   "Cookie estimated to be ",
//   serialize(`__Secure.next-auth.session-token.0`, "", {
//     expires: new Date(),
//     httpOnly: true,
//     maxAge: Number.MAX_SAFE_INTEGER,
//     path: "/",
//     sameSite: "strict",
//     secure: true,
//     domain: "example.com",
//   }).length,
//   " bytes"
// )

const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 163;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;

/**
 * CookieOption
 */

export interface CookieOption {
  name: string;
  options: CookieSerializeOptions;
}

export interface CookiesOptions {
  sessionToken: CookieOption;
  callbackUrl: CookieOption;
  csrfToken: CookieOption;
  pkceCodeVerifier: CookieOption;
  state: CookieOption;
  nonce: CookieOption;
}

export type SetCookieOptions = Partial<CookieOption['options']> & {
  expires?: Date | string;
  encode?: (val: unknown) => string;
};

export interface Cookie extends CookieOption {
  value: string;
}

export type Chunks = Record<string, string>;

/**
 * defaultCookies
 */

export function defaultCookies(useSecureCookies: boolean): CookiesOptions {
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';
  return {
    // default cookie options
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      // Default to __Host- for CSRF token for additional protection if using useSecureCookies
      // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
      name: `${useSecureCookies ? '__Host-' : ''}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 60 * 15, // 15 minutes in seconds
      },
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
  };
}

/**
 * CookieStore
 */

export class CookieStore {
  #chunks: Chunks = {};
  #option: CookieOption;
  #logger: LoggerInstance | Console;

  constructor(
    option: CookieOption,
    req: NextRequest,
    logger: LoggerInstance | Console,
  ) {
    this.#logger = logger;
    this.#option = option;

    // https://nextjs.org/docs/app/api-reference/functions/cookies
    if (req.cookies) {
      for (const { name, value } of req.cookies.getAll()) {
        if (name.startsWith(option.name)) {
          this.#chunks[name] = value;
        }
      }
    }
  }

  get value() {
    return Object.values(this.#chunks)?.join('');
  }

  /**
   * Given a cookie, return a list of cookies, chunked to fit the allowed cookie
   * size.
   */
  #chunk(cookie: Cookie): Cookie[] {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);

    if (chunkCount === 1) {
      this.#chunks[cookie.name] = cookie.value;
      return [cookie];
    }

    const cookies: Cookie[] = [];

    for (let i = 0; i < chunkCount; i++) {
      const name = `${cookie.name}.${i}`;
      const startIndex = i * CHUNK_SIZE;
      const endIndex = startIndex + CHUNK_SIZE;
      const value = cookie.value.substring(startIndex, endIndex);
      cookies.push({ ...cookie, name, value });
      this.#chunks[name] = value;
    }

    this.#logger.debug('CHUNKING_SESSION_COOKIE', {
      message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
      emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
      valueSize: cookie.value.length,
      chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE),
    });

    return cookies;
  }

  #clean(): Record<string, Cookie> {
    const cleanedChunks: Record<string, Cookie> = {};

    for (const name in this.#chunks) {
      delete this.#chunks?.[name];
      cleanedChunks[name] = {
        name,
        value: '',
        options: { ...this.#option.options, maxAge: 0 },
      };
    }

    return cleanedChunks;
  }

  /**
   * Given a cookie value, return new cookies, chunked, to fit the allowed
   * cookie size. If the cookie has changed from chunked to unchunked or vice
   * versa, it deletes the old cookies as well.
   */
  chunk(value: string, options: Partial<Cookie['options']>): Cookie[] {
    const cookies: Record<string, Cookie> = this.#clean();

    const chunked = this.#chunk({
      name: this.#option.name,
      value,
      options: { ...this.#option.options, ...options },
    });

    for (const chunk of chunked) {
      cookies[chunk.name] = chunk;
    }

    return Object.values(cookies);
  }

  clean(): Cookie[] {
    return Object.values(this.#clean());
  }
}
