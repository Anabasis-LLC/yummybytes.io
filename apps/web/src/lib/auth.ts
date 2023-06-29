// 3rd party
import type { NextRequest } from 'next/server';
import { jwtDecrypt } from 'jose';
import hkdf from '@panva/hkdf';

// lib
import { Awaitable } from './types';
import { LoggerInstance } from './logger';
import { CookieStore } from './cookie';

/**
 * JWT
 */

export interface DefaultJWT extends Record<string, unknown> {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string;
}

export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams {
  token?: JWT;
  secret: string | Buffer;
  maxAge?: number;
}

export interface JWTDecodeParams {
  token?: string;
  secret: string | Buffer;
}

export interface JWTOptions {
  secret: string;
  maxAge: number;
  encode: (params: JWTEncodeParams) => Awaitable<string>;
  decode: (params: JWTDecodeParams) => Awaitable<JWT | null>;
}

/**
 * decode
 */

export async function decode(params: JWTDecodeParams): Promise<JWT | null> {
  const { token, secret } = params;

  if (!token) {
    return null;
  }

  const encryptionSecret = await hkdf(
    'sha256',
    secret,
    '',
    'encryption key',
    32,
  );

  const { payload } = await jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15,
  });

  return payload;
}

/**
 * getToken
 */

export interface GetTokenParams {
  req: NextRequest;
  secure?: boolean;
  name?: string;
  raw?: boolean;
  secret?: string;
  logger?: LoggerInstance | Console;
}

export type GetTokenResponse =
  | { raw: true; token: string | null }
  | { raw: false; token: JWT | null };

export async function getToken(
  params: GetTokenParams,
): Promise<GetTokenResponse> {
  const {
    req,
    secure = false,
    name = process.env.AUTH_COOKIE,
    raw = false,
    logger = console,
    secret = process.env.AUTH_SECRET,
  } = params;

  if (!name) {
    throw new Error('Must pass `name` to JWT getToken()');
  }

  if (!secret) {
    throw new Error('Must pass `secret` to JWT getToken()');
  }

  if (!req) {
    throw new Error('Must pass `req` to JWT getToken()');
  }

  const sessionCookie = new CookieStore(
    { name, options: { secure } },
    req,
    logger,
  );
  let token = sessionCookie.value;
  const authorization = req.headers.get('authorization');

  if (!token && authorization?.split(' ')[0] === 'Bearer') {
    token = decodeURIComponent(authorization.split(' ')[1]);
  }

  if (!token) {
    return { raw, token: null };
  }

  try {
    return raw
      ? { raw, token }
      : { raw, token: await decode({ token, secret }) };
  } catch {
    return { raw, token: null };
  }
}
