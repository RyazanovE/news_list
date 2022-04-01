import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../List/List";
import { RootState } from "../store/store";
import { INews } from "../types/types";
import NewsItem from "../NewsItem/NewsItem";
import { setFetchArr } from "../store/reducers/fetchArrReducer";

const MainPage = () => {
  const [isLoading, setisLoading] = useState<boolean>(true);
  const dispatch = useDispatch()
  const newsArr: INews[] = useSelector((state:RootState) => (state.fetchArrReducer.fetchArr))

  let timer: any = useRef(); 

  function fetchNews() {
    setisLoading(true)
    if (timer.current) {
      clearTimeout(timer.current)
    }
    fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy="$key"&limitToFirst=100`)
      .then(resolve => resolve.json())
      .then(res => {
        const resArr: string[] = []
        for (let i = 0; i < 100; i++) {
          resArr.push(`https://hacker-news.firebaseio.com/v0/item/${res[i]}.json?print=pretty`)
        }

        Promise.all(resArr.map(url =>
          fetch(url).then(resp => resp.json())
        )).then(json => {
          dispatch(setFetchArr(json))
          setisLoading(false)
          timer.current = setInterval(() => {
            fetchNews()
          }, 60 * 1000)
        })
      })


  }



  useEffect(() => {
    fetchNews()
    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <>
      {!isLoading ? (
        <>
          <button className="update-button" onClick={() => {fetchNews()}}>Обновить</button>
          <List<INews>
            ListArr={newsArr}
            renderItem={(item) => <NewsItem key={item.id} item={item} />}
          >
            Список новостей
          </List>
        </>
      ) : (
        <img className="loader" src='/images/shariki.gif'></img>
      )}
    </>
  );
};

export default MainPage;
