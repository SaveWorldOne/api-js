/**
 * api/src/util/makeRequest.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 27.08.2023
 *
 */
import { IResponse } from "../types/IResponse";

export default async function makeRequest(options: {
  path: string;
  body?: object;
  token?: string;
  headers?: object;
  method:
    | "GET"
    | "POST"
    | "DELETE"
    | "PUT"
    | "HEAD"
    | "PATCH"
    | "OPTIONS"
    | "CONNECT"
    | "TRACE";
  rawBody?: boolean;
}): Promise<IResponse> {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "X-Executed-By": "@saveworld/api-js:makeRequest",
  };

  if (options.token) {
    headers["X-AUTH"] = options.token;
  }

  if (options.headers) {
    Object.keys(options.headers).forEach((customHeader) => {
      // @ts-ignore
      headers[customHeader] = options.headers[customHeader];
    });
  }

  let body = null;
  if (options.body) {
    if (options.rawBody) {
      body = options.body;
    } else {
      body = JSON.stringify(options.body);
    }
  }

  const res = await fetch(options.path, {
    method: options.method,
    headers,
    body: body,
  });

  const payload = await res.json();

  return {
    status: res.status,
    payload: payload,
  };
}
