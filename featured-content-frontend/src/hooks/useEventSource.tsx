import { useEffect, useState } from "react";
import { EventSourceParse } from "../types";

export function useEventSource<T>(key: string) {
  const [data, setData] = useState<T | T[]>();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/sse-notifications/${key}`
    );

    eventSource.onmessage = ({ data }: MessageEvent) => {
      if (data) {
        let parsedOb;

       try {
          parsedOb = JSON.parse(data);
          parsedOb = parsedOb as EventSourceParse<T>
        } catch (error) {
          console.error(error);
        }

        setData(parsedOb);
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
