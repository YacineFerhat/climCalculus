import axios from 'axios';
//import { useState, useEffect } from 'react'

export const createAxiosInstance = () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'http://38.242.228.3/api/api/tokens/'
        : 'http://38.242.228.3/api/api/tokens/',
    headers: {
      //authorization: 'Bearer ' + localStorage.getItem("access_token"),
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
};

export const handleCheck = async (input: string) => {
  const res = await createAxiosInstance().get(`checkToken/${input}`);
  const { data } = res;
  return data;
};
