import useMeta from "./useMeta";
import useScript from "./useScript";

const useGapi = (gapiClientId: string) => {
  useMeta(
    "google-signin-client_id",
    `${gapiClientId}.apps.googleusercontent.com`
  );
  useScript("https://apis.google.com/js/platform.js");
};

export default useGapi;
