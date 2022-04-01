import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Comment } from "../comment/Comment.jsx";

const NewsItemPage = () => {
  let timer: any = useRef();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [currentNewsItem, setcurrentNewsItem] = useState<any>([]);
  const navigate = useHistory();
  const arrToDisplay = [
    { title: "Заголовок:", value: currentNewsItem.title },
    { title: "Ссылка:", value: currentNewsItem.url },
    {
      title: "Дата:",
      value: new Date(currentNewsItem.time * 1000).toLocaleDateString(
        currentNewsItem.time
      ),
    },
    { title: "Автор:", value: currentNewsItem.by },
  ];

  function fetchComments() {
    setisLoading(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }

    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${localStorage.currentItem}.json?print=pretty`
    )
      .then((resolve) => resolve.json())
      .then((res) => {
        return res;
      })
      .then((res) => {
        setcurrentNewsItem(res);
        setisLoading(false);
        timer.current = setInterval(() => {
          fetchComments();
        }, 60 * 1000);
      });
  }

  useEffect(() => {
    fetchComments();
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <div className="newsitem">
        {arrToDisplay.map((item) => {
          return (
            <div key={item.title}>
              <span className="newsitem__title">{item.title}</span>
              {item.title === "Заголовок:" ? (
                <h3 className="newsitem__value">{item.value}</h3>
              ) : (
                <span className="newsitem__value">{item.value}</span>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          navigate.push("./");
        }}
        className="button-back"
      >
        На главную
      </button>
      {!isLoading && <Comment idArr={currentNewsItem} />}
    </>
  );
};

export default NewsItemPage;
