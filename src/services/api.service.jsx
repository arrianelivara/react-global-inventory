import axios from "axios";
import { environment } from "../environments/environment";
import "interceptors/request";

export const Get = async (url, params, config) => {
  try {
    const res = await axios.get(`${environment.API}/${url}`, {
      params,
      ...config,
    });
    
    return res.data;
  } catch (err) {
    throw handleErrorResponse(err);
  }
};

export const Post = async (url, body, config) => {
  try {
    const res = await axios.post(`${environment.API}/${url}`, body, config);
    return res.data;
  } catch (err) {
    throw handleErrorResponse(err);
  }
};

export const Put = async (url, body, config) => {
  try {
    const res = await axios.put(`${environment.API}/${url}`, body, config);
    return res.data;
  } catch (err) {
    throw handleErrorResponse(err);
  }
};

export const Delete = async (url, body, config) => {
  try {
    const res = await axios.delete(`${environment.API}/${url}`, body, config);
    return res.data;
  } catch (err) {
    throw handleErrorResponse(err);
  }
};

const handleErrorResponse = (err) => {
  const { response = {}, message } = err;
  const { status = null, statusText = null, data = {} } = response;
  const { metadata } = data;

  let error = {
    status,
    statusText,
    metadata,
  };

  if (message === "Network Error") {
    error = {
      ...error,
      error: "network",
    };
    return error;
  }

  if (status === 401) {
    error = {
      ...error,
      error: "unauthorized",
    };
    return error;
  }

  if (status === 400) {
    error = {
      ...error,
      error: "badrequest",
    };
    return error;
  }

  error = {
    ...error,
    error: "server",
  };

  return error;
};
