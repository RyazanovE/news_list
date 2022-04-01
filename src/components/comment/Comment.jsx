import React, { useEffect, useState,useRef } from "react";

export const Comment = ({ idArr }) => {
  const [currentComment, setCurrentComment] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  let timer = useRef();

  function fetchComments() {
    if (!idArr.kids) {
      return;
    }
    Promise.all(
      idArr.kids.map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        ).then((resp) => {
          return resp.json();
        })
      )
    ).then((res) => {
      setCurrentComment(res);
      setisLoading(false);
      timer.current = setInterval(() => {
        fetchNews();
      }, 60 * 1000);
      return;
    });
  }

  useEffect(() => {
    fetchComments();
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div>
      <ul>
        {!isLoading &&
          currentComment.map((item, ind) => (
            <CommentNode key={ind} node={item} />
          ))}
      </ul>
    </div>
  );
};

export const CommentNode = ({ node }) => {
  const [childVisible, setChildVisible] = useState(false);

  return (
    <li>
      <div
        className="comment newsitem"
        onClick={() => {
          setChildVisible((v) => !v);
        }}
      >
        <span className="comment__title">Автор:</span> {node.by} <br />
        <span className="comment__title">Текст</span>: {node.text}
      </div>

      {childVisible && node.kids && (
        <div>
          <ul>
            <Comment idArr={node} />
          </ul>
        </div>
      )}
    </li>
  );
};
