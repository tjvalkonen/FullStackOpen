import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {

  try {
   //const response = await axios.get<DiaryEntry[]>(baseUrl);
     return await axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
      
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
}

/*
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}
    */

export const createDiary = async (object: NewDiaryEntry) => {
  try {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
      
      return error.response;
      // Do something with this error...
    } else {
      console.error(error);
    }
  }

}