import { useEffect, useState } from "react";

export function useEventSource<T>(key: string) {
  const [data, setData] = useState<T | T[]>();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/sse-notifications/${key}`
    );

    eventSource.onmessage = ({ data }: MessageEvent) => {
      if (data) {
        let parsedData;

        try {
          parsedData = JSON.parse(data);
        } catch (error) {
          console.error(error);
        }

        if (Array.isArray(parsedData)) {
          const parsedDataList = parsedData.map<T>((el) => {
            let parsedEl = null;
            try {
              parsedEl = JSON.parse(el);
            } catch (error) {
              console.error(error);
            }

            return parsedEl as T;
          });

          parsedData = parsedDataList;
        } else {
        }

        setData(parsedData);
      }
    };

    eventSource.onerror = (error) => {
      console.error(error);
      setData({} as T);
    };

    return function clearEvents() {
      eventSource.close();
    };
  }, []);

  return { data };
}
