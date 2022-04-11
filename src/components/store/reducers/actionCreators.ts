import { AppDispatch } from "../store";
import { usersFetching, usersFetchingError, usersFetchingSuccess, usersFetchingAddSuccess } from "./fetchArrReducer";

export default function fetchNews(dispatch: AppDispatch, page: number) {

  const pageLimit = 10
  dispatch(usersFetching())
  
  if (page < 2) {
  fetch(
    `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy="$key"&limitToFirst=${pageLimit}`
  )
    .then((resolve) => resolve.json())
    .then((data) => {
      const resArr: string[] = [];
      for (let i = 0; i < pageLimit; i++) {
        resArr.push(
          `https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`
        );
      }
      return resArr;
    })
    .then((resArr) => {
      return Promise.all(
        resArr.map((url) => fetch(url).then((resp) => resp.json()))
      ).then((json) => {
          dispatch(usersFetchingSuccess(json))
      });
    })
    .catch((e) => {
        dispatch(usersFetchingError(e.message))
    })
 }  else {

 
  fetch(
    `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy="$key"&limitToFirst=${page*pageLimit}`
  )
    .then((resolve) => resolve.json())
    .then((data) => {
      const resArr: string[] = [];
      for (let i = page*pageLimit-pageLimit; i < page*pageLimit; i++) {
        resArr.push(
          `https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`
        );
      }
      return resArr;
    })
    .then((resArr) => {
      return Promise.all(
        resArr.map((url) => fetch(url).then((resp) => resp.json()))
      ).then((json) => {
          dispatch(usersFetchingAddSuccess(json))
      });
    })
    .catch((e) => {
        dispatch(usersFetchingError(e.message))
    })
 } 
  
  }