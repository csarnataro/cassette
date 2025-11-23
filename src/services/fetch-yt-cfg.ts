import { extract } from "@/utils/cfgExtractor";
/* NOT USED */
const fetchYoutubeConfigs = async (): Promise<Record<string, any>> => {
  const response = fetch("https://www.youtube.com/", {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "text/html",
      "Accept-Encoding": "gzip",
    },
    credentials: "include",
  });

  const html = await (await response).text();
  const cfg = extract(html);
  return cfg;
};

export default fetchYoutubeConfigs;
