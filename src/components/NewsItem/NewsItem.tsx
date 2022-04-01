import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {useHistory } from "react-router-dom"
import { INews } from "../types/types";


interface NewsItemProps {
  item: INews;
}

const NewsItem: FC<NewsItemProps> = ({item}) => {
  const navigate = useHistory ()
 
  return (
      <div className="newsitem" onClick={() => {
        localStorage.currentItem = item.id
        navigate.push("/newspage")
        }}>
        <div className="newsitem__text"><span>Название:</span> {item.title}</div>
        <div className="newsitem__text"><span>Рейтинг:</span> {item.score}</div>
        <div className="newsitem__text"><span>Ник атвора:</span> {item.by}</div>
        <div className="newsitem__text"><span>Дата публикации:</span> {new Date(item.time*1000).toLocaleTimeString() + " "+ new Date(item.time*1000).toLocaleDateString()}</div>
        {<div className="newsitem__text"><span style={item.descendants ? {color: "red"} : {}}>Комментарии:</span> {item.descendants}</div>}
      </div>
  );
};

export default NewsItem;
