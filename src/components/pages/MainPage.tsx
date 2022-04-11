import React, { useState, useEffect, useRef } from "react";
import List from "../List/List";
import { INews } from "../types/types";
import NewsItem from "../NewsItem/NewsItem";
import useScroll from "../hooks/useScroll";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import fetchNews from "../store/reducers/actionCreators";

const MainPage = () => {
  const {fetchArr, isLoading, error} = useAppSelector(state => state.fetchArrReducer)
  const [page, setPage] = useState<number>(1)



  const dispatch = useAppDispatch();
  
  const childRef = useRef()
 
 
  useScroll(isLoading, null ,  childRef, () => {
 
    setPage(p=>p+1)
    fetchNews(dispatch, page+1);
    
  })

  useEffect(() => {
    fetchNews(dispatch, page);
  }, []);


  return (
    <div  className="userlist-container" >
      {!isLoading || page>1? (
        <div className="userlist" >  
          <button
            className="update-button"
            onClick={() => {
              fetchNews(dispatch, page);
            }}
          >
            Обновить
          </button>
          <List<INews>
            ListArr={fetchArr}
            renderItem={(item) => <NewsItem key={item.id} item={item} />}
          >
            Список новостей
          </List>
          <div ref={childRef}></div>
        </div>
      ) : (
        <img className="loader" src="/images/shariki.gif"></img>
      )}
    </div>
  );
};

export default MainPage;
