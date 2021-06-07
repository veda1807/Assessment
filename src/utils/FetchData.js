// Author:Sreeevidya

//This component is used to fetch the data from API 

import React, { useEffect, useState } from "react";
function FetchData({ url, initialState = null, skip = false }) {
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState({}); // used to force running the api fetch in effect
  
    useEffect(() => {
      let mounted = true;
  
      if (!skip) {
        setIsLoading(true);
  
        fetch(url)
          .then(res => res.json())
          .then(result => {
            mounted && setData(result);
          })
          .catch(showError)
          .finally(() => {
            mounted && setIsLoading(false);
          });
      }
  
      return () => {
        mounted = false;
      };
    }, [url, reload, skip]);
  
    const reloadData = () => {
      setReload({});
    };
  
    return { data, setData, isLoading, reloadData };
  };

  const showError = err => {
    alert(err);
  };

  export default FetchData;
  
