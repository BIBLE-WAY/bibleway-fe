const getApiDomain = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return "api.bibleway.io";
};

const getApiProtocol = (): string => {
  return import.meta.env.VITE_API_PROTOCOL || "https";
};

const getWsProtocol = (): string => {
  return import.meta.env.VITE_WS_PROTOCOL || "wss";
};

export const BASE_URL: string = getApiDomain();
export const API_URL: string = `${getApiProtocol()}://${BASE_URL}/`;
export const WS_URL: string = `${getWsProtocol()}://${BASE_URL}`;
