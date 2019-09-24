import { IncomingMessage } from "http";

export const getBaseUrl = (req?: IncomingMessage): string => {
  let baseUrl = "";

  if (req) {
    const {
      headers: { host }
    } = req;

    if (host.indexOf("localhost") > -1) {
      baseUrl = "http://" + host;
    } else {
      baseUrl = "https://" + host;
    }
  } else {
    baseUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port;
  }

  return baseUrl;
};
