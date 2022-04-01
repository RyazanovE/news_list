import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Comment } from "../comment/Comment.jsx";

const NewsItemPage = () => {
  let timer: any = useRef();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [currentNewsItem, setcurrentNewsItem] = useState<any>([]);
  const navigate = useHistory()


  // async function recursiveAll(idArr: string[], resultArr: any[]) {

  // await Promise.all(
  //   idArr.map((id) => {
  //     return fetch(
  //       `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  //     ).then((res) => {
  //       return res.json();
  //     });
  //   })
  // ).then((comments) => {
  //   const kidsArrArr = comments
  //     .map((comment: any) => {
  //       if (comment.kids) {
  //         return comment.kids;
  //       } else {
  //         return null;
  //       }
  //     })
  //     .filter((item) => {
  //       return item !== null;
  //     });

  //   if (kidsArrArr.length === 0) {
  //     comments.forEach((comment: any) => {
  //       resultArr.push(comment);
  //     });

  //     return resultArr;
  //   }

  //  (async () => {
  //   for (const kidArr of kidsArrArr) {
  //     await recursiveAll(kidArr, resultArr);
  //   }
  //  }
  //  )()

  //   comments.forEach((comment: any) => {
  //     resultArr.push(comment);
  //   });

  // });
  // }

  // function list_to_tree() {

  // const list: any[] = [];
  // let map: any = {},
  //   parentID = list[0].id,
  //   node,
  //   roots = [],
  //   i;

  // for (i = 0; i < list.length; i += 1) {
  //   map[list[i].id] = i; // initialize the map
  //   list[i].children = []; // initialize the children
  // }

  // for (i = 0; i < list.length; i += 1) {
  //   node = list[i];

  //   if (node.parent !== parentID) {
  //     // if you have dangling branches check that map[node.parentId] exists
  //     list[map[node.parent]].children.push(node);
  //   } else {
  //     roots.push(node);
  //   }
  // }
  // console.log(roots);
  // return roots;
  // }

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
      clearTimeout(timer);
    };
  }, []);

  const arrToDisplay = [
    { title: "Заголовок:", value: currentNewsItem.title },
    { title: "Ссылка:", value: currentNewsItem.url},
    { title: "Дата:", value: new Date(currentNewsItem.time * 1000).toLocaleDateString(
      currentNewsItem.time
    ) },
    { title: "Автор:", value: currentNewsItem.by },
  ];

  return (
    <>
      <div className="newsitem">
        {arrToDisplay.map((item) => {
          return <div key={item.title}><span className="newsitem__title">{item.title}</span>{item.title==="Заголовок:" ? <h3 className="newsitem__value">{item.value}</h3> : <span className="newsitem__value">{item.value}</span>}</div>
        })}
      </div >
      <button onClick={() => {navigate.push("./")}} className="button-back">На главную</button>
      {!isLoading && <Comment idArr={currentNewsItem} />}
    </>
  );
};

export default NewsItemPage;
