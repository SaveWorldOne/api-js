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
    /**
     * @return the stats of the system (user count, category count, ...)
     * @param token used to authenticate
     */
    stats: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/stats",
        method: "GET",
        token: token,
      });
    },
    /**
     * @return the requested user(s)
     * @param token used to authenticate
     * @param id of the user to get
     */
    users: async (token: string, id?: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/users" + (id ? "?id=" + id : ""),
        method: "GET",
        token: token,
      });
    },
    /**
     * Updates a user account
     * @param token used to authenticate
     * @param id of the user to update
     * @param update the update object
     */
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
    /**
     * Deletes a user account
     * @param token used to authenticate
     * @param id of the user to delete
     */
    deleteUser: async (token: string, id: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/users/delete?id=" + id,
        method: "DELETE",
        token: token,
      });
    },
    /**
     * Creates a category
     * @param token used to authenticate
     * @param name of the category
     * @param description of the category
     * @param image of the category (url)
     */
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
    /**
     * Deletes a category
     * @param token used to authenticate
     * @param id of the category to delete
     */
    deleteCategory: async (token: string, id: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/content/categories?id=" + id,
        method: "DELETE",
        token: token,
      });
    },
    /**
     * @return all videos
     * @param token used to authenticate
     * @param page the page to get
     */
    videos: async (token: string, page: number) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/content/videos/list?page=" + page,
        method: "GET",
        token,
      });
    },
    /**
     * Deletes a video
     * @param token used to authenticate
     * @param id of the video to delete
     */
    deleteVideo: async (token: string, id: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/content/videos/delete?id=" + id,
        method: "DELETE",
        token: token,
      });
    },
    /**
     * Updates a video
     * @param token used to authenticate
     * @param id of the video to update
     * @param title of the video
     * @param description of the video
     * @param categories of the video
     */
    updateVideo: async (
      token: string,
      id: string,
      title: string,
      description: string,
      categories: string[],
    ) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/admin/content/videos/update?id=" + id,
        method: "POST",
        token: token,
        body: {
          title: title,
          description: description,
          categories: categories,
        },
      });
    },
  };

  public static Account = {
    /**
     * @return the requested jwt
     * @param mail of the user
     * @param password of the user
     * @param totpCode of the user (optional, if enabled)
     */
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
    /**
     * Creates a new user account
     * @param options user data
     */
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
    /**
     * @return the requested user by jwt
     * @param token used to authenticate
     */
    verify: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/verify-token",
        method: "GET",
        token: token,
      });
    },
    /**
     * Updates a user account
     * @param token used to authenticate
     * @param options the update object
     */
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
    /**
     * Deletes a user account
     * @param token used to authenticate
     */
    delete: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/delete",
        method: "DELETE",
        token: token,
      });
    },
    /** Returns the user preferences
     * @param token used to authenticate
     */
    preferences: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/preferences",
        method: "GET",
        token: token,
      });
    },
    /**
     * Updates the user preferences
     * @param token used to authenticate
     * @param update the update object
     */
    updatePreferences: async (token: string, update: any) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/account/preferences",
        method: "POST",
        token: token,
        body: {
          update: update,
        },
      });
    },
  };

  public static Content = {
    /**
     * @return all categories
     */
    categories: async () => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/content/categories",
        method: "GET",
      });
    },
    /**
     * @return the metadata of the requested video
     */
    videoMetadata: async (s3id: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/content/videos/" + s3id + "/metadata",
        method: "GET",
      });
    },
    /**
     * @return the next suggested video
     * @param token used to authenticate
     */
    nextVideo: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/content/videos/suggested",
        method: "GET",
        token: token,
      });
    },
    /**
     * Adds a video to watch history
     * @param token used to authenticate
     * @param videoId of the video
     * @param time the time in seconds
     * @param finished if the video is finished
     */
    addVideoToHistory: async (token: string, videoId: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/content/videos/history",
        method: "POST",
        token: token,
        body: {
          videoId: videoId,
        },
      });
    },
    /**
     * @return the requested videos
     * @param query the query to search for
     * @param page the page to get
     */
    search: async (query: string, page: number) => {
      return await makeRequest({
        path:
          RESTEnv.API_URL + "/content/videos/fts?q=" + query + "&page=" + page,
        method: "GET",
      });
    },
    /**
     * Rates a video
     * @param id of the video to get
     * @param rating the rating to set
     */
    rate: async (id: string, rating: number) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/content/videos/" + id + "/rate",
        method: "POST",
        body: {
          rating: rating,
        },
      });
    },
  };

  public static Tracker = {
    /**
     * Creates a new eco action
     * @param token used to authenticate
     * @param action the action to create
     * @param description the description of the action
     * @param date the date of the action
     */
    createAction: async (
      token: string,
      action: string,
      description: string,
      date: string,
    ) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/tracker/createAction",
        method: "POST",
        token: token,
        body: {
          action: action,
          description: description,
          date: date,
        },
      });
    },
    /**
     * Deletes an eco action
     * @param token used to authenticate
     * @param id of the action to delete
     */
    deleteAction: async (token: string, id: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/tracker/deleteAction?id=" + id,
        method: "DELETE",
        token: token,
      });
    },
    /**
     * Updates an eco action
     * @param token used to authenticate
     * @param id of the action to update
     * @param action the action to create
     * @param description the description of the action
     * @param date the date of the action
     */
    updateAction: async (
      token: string,
      id: string,
      action: string,
      description: string,
      date: string,
    ) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/tracker/updateAction?id=" + id,
        method: "POST",
        token: token,
        body: {
          action: action,
          description: description,
          date: date,
        },
      });
    },
    /**
     * @return the requested eco actions
     * @param token used to authenticate
     * @param date the date to get
     */
    actions: async (token: string, date: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/tracker/actions?date=" + date,
        method: "GET",
        token: token,
      });
    },
    /**
     * @return all dates with eco actions
     * @param token used to authenticate
     */
    dates: async (token: string) => {
      return await makeRequest({
        path: RESTEnv.API_URL + "/tracker/dates",
        method: "GET",
        token: token,
      });
    },
  };
}
