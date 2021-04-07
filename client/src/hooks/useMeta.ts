import { useEffect } from "react";

const useMeta = (name: string, content: string) => {
  useEffect(() => {
    const meta = document.createElement("meta");

    meta.name = name;
    meta.content = content;

    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, content]);
};

export default useMeta;
