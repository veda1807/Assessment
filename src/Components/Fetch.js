// Author:Sreevidya

// This component is used to fetch the details from API.

import React, { useEffect, useState } from "react";
function Fetch({ url, initialState = null, skip = false }) {
    const [cdata, setData] = useState(initialState);
    const [isLoad, setIsLoading] = useState(true);
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
    // your custom error display logic
    alert(err);
  };

  export default Fetch;
  
