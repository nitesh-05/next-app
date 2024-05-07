import { useEffect, useState } from "react";

export const withData = (
  WrappedComponent: any,
  endPoint: string,
  resData: any
) => {
  const cacheData = localStorage.getItem(resData);

  return () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      console.log(endPoint);
      const fetchData = async () => {
        const res = await fetch(endPoint);
        const result = await res.json();
        if (result) {
          localStorage.setItem(resData, JSON.stringify(result));
          setLoading(false);
          setData(result);
        }
      };
      if (cacheData) {
        setLoading(false);
        setData(JSON.parse(cacheData));
      } else {
        fetchData();
      }
    }, []);

    return <WrappedComponent data={data} loading={loading} />;
  };
};
