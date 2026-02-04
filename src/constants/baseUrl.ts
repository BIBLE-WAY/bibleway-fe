const getApiDomain = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return "api.bibleway.io";
};

export const BASE_URL: string = getApiDomain();
export const API_URL: string = `https://${BASE_URL}/`;
export const WS_URL: string = `wss://${BASE_URL}`;
