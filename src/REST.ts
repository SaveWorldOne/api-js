/**
 * api/src/REST.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 27.08.2023
 *
 */
import makeRequest from "./util/makeRequest";
import { RESTEnv } from "./RESTEnv";

export class REST {
  public static Admin = {
    stats: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/stats",
        method: "GET",
        token: token,
      });
    },
    users: async (token: string, id?: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/users" + (id ? "?id=" + id : ""),
        method: "GET",
        token: token,
      });
    },
    updateUser: async (token: string, id: string, update: any) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/users/update?id=" + id,
        method: "POST",
        token: token,
        body: {
          update: update,
        },
      });
    },
    deleteUser: async (token: string, id: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/users/delete?id=" + id,
        method: "DELETE",
        token: token,
      });
    },
    createCategory: async (
      token: string,
      name: string,
      description: string,
      image: string,
    ) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/content/categories",
        method: "POST",
        token: token,
        body: {
          name: name,
          description: description,
          image: image,
        },
      });
    },
  };

  public static Account = {
    login: async (mail: string, password: string, totpCode?: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/login",
        method: "POST",
        body: {
          email: mail,
          password: password,
          totpCode: totpCode,
        },
      });
    },
    register: async (options: {
      mail: string;
      password: string;
      username: string;
      firstName: string;
      lastName: string;
    }) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/register",
        method: "POST",
        body: {
          email: options.mail,
          password: options.password,
          username: options.username,
          firstName: options.firstName,
          lastName: options.lastName,
        },
      });
    },
    verify: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/verify-token",
        method: "GET",
        token: token,
      });
    },
    update: async (
      token: string,
      options: {
        password?: string;
        firstName?: string;
        lastName?: string;
        totpActive?: boolean;
        totpCode?: string;
      },
    ) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/update",
        method: "POST",
        token: token,
        body: {
          update: {
            password: options.password,
            firstName: options.firstName,
            lastName: options.lastName,
            totpActive: options.totpActive,
          },
          totpCode: options.totpCode,
        },
      });
    },
    delete: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/delete",
        method: "DELETE",
        token: token,
      });
    },
  };

  public static Content = {
    categories: async () => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/content/categories",
        method: "GET",
      });
    },
  };
}
