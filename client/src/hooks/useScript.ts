import { useEffect } from "react";

const useScript = (url: string, defer: boolean = true) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.defer = defer;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, defer]);
};

export default useScript;
