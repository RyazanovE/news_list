import React, { useEffect, useRef } from "react";

export default function useScroll(isLoading, parentRef, childRef=null, callback) {
  const observer = useRef();



  useEffect(() => {

      if (isLoading) {
          return
      }
     

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
       callback()
       
      } 

    }, options);

    observer.current.observe(childRef.current)

    return () => {
       
       if (childRef.current) {
      
        observer.current.unobserve(childRef.current)
       } 
       
    
        }
  }, [callback, isLoading]);



}
