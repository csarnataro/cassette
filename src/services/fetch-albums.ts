import { WEB_REMIX } from "@/constants/yt-agents";
import { Album } from "@/domain/album";
import { JSONPath } from "jsonpath-plus";

const fetchAlbums2 = async (
  query: string,
  configs: Record<string, any>
): Promise<Album[]> => {
  if (!query) {
    return Promise.resolve([]);
  }

  // await sleep(2000);

  const ua = WEB_REMIX;

  /////////////////////////

  const headers: Record<string, string> = {};
  headers["User-Agent"] = ua.userAgent;
  // "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  // WEB_REMIX.userAgent,

  headers["Accept-Language"] = "en-US,en;q=0.5";
  headers["Content-Type"] = "application/json";
  headers["Accept-Encoding"] = "gzip";

  headers["origin"] = "https://music.youtube.com";
  headers["x-origin"] = "https://music.youtube.com";
  headers["x-browser-channel"] = "stable";
  headers["x-browser-copyright"] =
    "Copyright 2025 Google LLC. All rights reserved.";
  headers["X-Goog-Visitor-Id"] = ua.visitorData!; // configs.VISITOR_DATA || ";
  headers["X-YouTube-Client-Name"] = ua.clientName; // configs.INNERTUBE_CONTEXT_CLIENT_NAME;
  headers["X-YouTube-Client-Version"] = ua.clientVersion; // configs.INNERTUBE_CLIENT_VERSION;
  headers["X-YouTube-Device"] = configs.DEVICE;
  headers["X-YouTube-Page-CL"] = configs.PAGE_CL;
  headers["X-YouTube-Page-Label"] = configs.PAGE_BUILD_LABEL;
  headers["X-YouTube-Utc-Offset"] = String(-60 * 5);
  headers["X-YouTube-Time-Zone"] = "US/Eastern";
  headers["referer"] = ua.referer!;

  const searchParams = `prettyPrint=false&alt=json&key=${ua.api_key}`; // configs.INNERTUBE_API_KEY}`;
  const fetchedAlbumsStructure = await fetch(
    `https://music.youtube.com/youtubei/${configs.INNERTUBE_API_VERSION}/search?${searchParams}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        context: {
          capabilities: {},
          client: {
            clientName: configs.INNERTUBE_CLIENT_NAME,
            clientVersion: configs.INNERTUBE_CLIENT_VERSION,
            experimentIds: [],
            visitorData: configs.VISITOR_DATA,
            experimentsToken: "",
            gl: configs.GL,
            hl: configs.HL,
            locationInfo: {
              locationPermissionAuthorizationStatus:
                "LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED",
            },
            musicAppInfo: {
              musicActivityMasterSwitch:
                "MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE",
              musicLocationMasterSwitch:
                "MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE",
              pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
            },
            utcOffsetMinutes: -new Date().getTimezoneOffset(),
          },
          request: {
            internalExperimentFlags: [
              {
                key: "force_music_enable_outertube_tastebuilder_browse",
                value: "true",
              },
              {
                key: "force_music_enable_outertube_playlist_detail_browse",
                value: "true",
              },
              {
                key: "force_music_enable_outertube_search_suggestions",
                value: "true",
              },
            ],
            sessionIndex: {},
          },
          user: {
            enableSafetyMode: false,
          },
        },
        query,
        params: "EgWKAQIYAWoSEAkQAxAOEAQQChAQEAUQFRAR",
        inlineSettingStatus: "INLINE_SETTING_STATUS_ON",
      }),
    }
  );

  const json = await fetchedAlbumsStructure.json();

  const albumsContents = JSONPath({
    path: "$.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0]..videoRenderer[*]",
    json,
    eval: "native",
  }) as any[];

  console.log("************ BEGIN: fetch-albums 99 ************");
  console.log(json);
  console.log("************ MID. : fetch-albums 99 ************");
  console.log(albumsContents);
  console.log("************ END:   fetch-albums 99 ************");
  return albumsContents.map((albumContent, index) => {
    const title = JSONPath({
      path: "$..flexColumns[0]..runs[0].text",
      json: albumContent,
      eval: "native",
    });

    const year = JSONPath({
      path: "$..flexColumns[1]..runs[-1:].text",
      json: albumContent,
      eval: "native",
    });
    const browseId = JSONPath({
      path: "$.navigationEndpoint.browseEndpoint.browseId",
      json: albumContent,
      eval: "native",
    });
    const info = JSONPath({
      path: "$..flexColumns[1]..runs[*].text",
      json: albumContent,
      eval: "native",
    }); // .join(" ");

    return {
      browseId: `${index}`,
      year,
      title,
      info,
    };
  });
};

const fetchAlbums = async (
  query: string,
): Promise<Album[]> => {
  if (!query) {
    return Promise.resolve([]);
  }

  const headers: Record<string, string> = {};
  headers["accept"] = "*/*";
  headers["accept-language"] = "en-US,en;q=0.9";
  headers["content-type"] = "application/json";
  headers["origin"] = "https://music.youtube.com";
  headers["priority"] = "u=1, i";
  headers["referer"] = "https://music.youtube.com/?cbrd=1";
  headers["sec-ch-ua"] =
    '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"';
  headers["sec-ch-ua-arch"] = "arm";
  headers["sec-ch-ua-bitness"] = "64";
  headers["sec-ch-ua-form-factors"] = "Desktop";
  headers["sec-ch-ua-full-version"] = "141.0.7390.123";
  headers["sec-ch-ua-full-version-list"] =
    '"Google Chrome";v="141.0.7390.123", "Not?A_Brand";v="8.0.0.0", "Chromium";v="141.0.7390.123"';
  headers["sec-ch-ua-mobile"] = "?0";
  headers["sec-ch-ua-model"] = "";
  headers["sec-ch-ua-platform"] = "macOS";
  headers["sec-ch-ua-platform-version"] = "15.6.1";
  headers["sec-ch-ua-wow64"] = "?0";
  headers["sec-fetch-dest"] = "empty";
  headers["sec-fetch-mode"] = "same-origin";
  headers["sec-fetch-site"] = "same-origin";
  headers["user-agent"] =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
  headers["x-browser-channel"] = "stable";
  headers["x-browser-copyright"] =
    "Copyright 2025 Google LLC. All rights reserved.";
  headers["x-browser-validation"] = "qSH0RgPhYS+tEktJTy2ahvLDO9s=";
  headers["x-browser-year"] = "2025";
  headers["x-goog-visitor-id"] =
    "Cgt0NzE0azk3YnVxayjTkL3IBjInCgJJVBIhEh0SGwsMDg8QERITFBUWFxgZGhscHR4fICEiIyQlJiAe";
  headers["x-youtube-bootstrap-logged-in"] = "false";
  headers["x-youtube-client-name"] = "67";
  headers["x-youtube-client-version"] = "1.20251103.03.00";

  const fetchedAlbumsStructure = await fetch(
    `https://music.youtube.com/youtubei/v1/search?prettyPrint=false`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        context: {
          client: {
            hl: "en",
            gl: "IT",
            remoteHost: "2a01:e11:1407:b4a0:54ae:f82b:8c07:5fdf",
            deviceMake: "Apple",
            deviceModel: "",
            visitorData:
              "Cgt0NzE0azk3YnVxayjTkL3IBjInCgJJVBIhEh0SGwsMDg8QERITFBUWFxgZGhscHR4fICEiIyQlJiAe",
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36,gzip(gfe)",
            clientName: "WEB_REMIX",
            clientVersion: "1.20251103.03.00",
            osName: "Macintosh",
            osVersion: "10_15_7",
            originalUrl: "https://music.youtube.com/?cbrd=1",
            platform: "DESKTOP",
            clientFormFactor: "UNKNOWN_FORM_FACTOR",
            configInfo: {
              appInstallData:
                "CNOQvcgGEIHNzhwQ0eDPHBC52c4cENeW0BwQ-dDPHBD7_88cEOK4sAUQg57QHBD8ss4cEJT-sAUQ9quwBRCW288cEIiHsAUQm_bPHBDwnc8cEPWX0BwQlPLPHBDyndAcEMj3zxwQ2vfOHBDBj9AcEK21gBMQtZfQHBCL988cEOWk0BwQt-r-EhDksoATEN7pzxwQuOTOHBCc188cEL_bzxwQpZ_QHBC9tq4FEJX3zxwQzN-uBRC9mbAFEIKU0BwQ8JywBRDzs4ATEMzrzxwQibDOHBC72c4cEJ7QsAUQ0-GvBRC-irAFEIzpzxwQlIPQHBCHrM4cEOK4zxwQp6XQHBD6hdAcEPOQ0BwQ3rzOHBDJ968FEK7WzxwQmY2xBRDDuIATEM_1zxwQ64zQHCpEQ0FNU0x4VXMtWnEtRExpVUV1c0J4OVh3Q3pLX1gtblZCUVBOX3dXaGdBYWlMcVJpbjVBRzlnX1NGWlVpbFlqckhoMEgwAA%3D%3D",
              coldConfigData:
                "CNOQvcgGGjJBT2pGb3gyczBzMmg3QmlOdWlhQ2dpS3FFdGhYWkxlM2lBTzRLazNhSFZjT05hRDV0ZyIyQU9qRm94MnMwczJoN0JpTnVpYUNnaUtxRXRoWFpMZTNpQU80S2szYUhWY09OYUQ1dGc%3D",
              coldHashData:
                "CNOQvcgGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGNOQvcgGMjJBT2pGb3gyczBzMmg3QmlOdWlhQ2dpS3FFdGhYWkxlM2lBTzRLazNhSFZjT05hRDV0ZzoyQU9qRm94MnMwczJoN0JpTnVpYUNnaUtxRXRoWFpMZTNpQU80S2szYUhWY09OYUQ1dGc%3D",
              hotHashData:
                "CNOQvcgGEhM5NDk5Mzg5NTM4Njk0MjQyMDEyGNOQvcgGMjJBT2pGb3gyczBzMmg3QmlOdWlhQ2dpS3FFdGhYWkxlM2lBTzRLazNhSFZjT05hRDV0ZzoyQU9qRm94MnMwczJoN0JpTnVpYUNnaUtxRXRoWFpMZTNpQU80S2szYUhWY09OYUQ1dGc%3D",
            },
            browserName: "Chrome",
            browserVersion: "141.0.0.0",
            acceptHeader:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            deviceExperimentId:
              "ChxOelUzTURNME9UQXlNVEV5TVRRek1UZzNNUT09ENOQvcgGGNOQvcgG",
            rolloutToken: "CPLyuMn6x4edRxD3nvqK1-KQAxj3nvqK1-KQAw%3D%3D",
            screenWidthPoints: 1321,
            screenHeightPoints: 848,
            screenPixelDensity: 2,
            screenDensityFloat: 2,
            utcOffsetMinutes: 60,
            userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
            timeZone: "Europe/Rome",
            musicAppInfo: {
              pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
              webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
              storeDigitalGoodsApiSupportStatus: {
                playStoreDigitalGoodsApiSupportStatus:
                  "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED",
              },
            },
          },
          user: { lockedSafetyMode: false },
          request: {
            useSsl: true,
            internalExperimentFlags: [],
            consistencyTokenJars: [],
          },
          adSignalsInfo: {
            params: [
              { key: "dt", value: "1762609235858" },
              { key: "flash", value: "0" },
              { key: "frm", value: "0" },
              { key: "u_tz", value: "60" },
              { key: "u_his", value: "3" },
              { key: "u_h", value: "1080" },
              { key: "u_w", value: "1920" },
              { key: "u_ah", value: "1055" },
              { key: "u_aw", value: "1920" },
              { key: "u_cd", value: "24" },
              { key: "bc", value: "31" },
              { key: "bih", value: "848" },
              { key: "biw", value: "1321" },
              {
                key: "brdim",
                value: "-93,-1008,-93,-1008,1920,-1055,1321,969,1321,848",
              },
              { key: "vis", value: "1" },
              { key: "wgl", value: "true" },
              { key: "ca_type", value: "image" },
            ],
          },
        },
        query,
        params: "EgWKAQIYAWoSEAkQAxAOEAQQChAQEAUQFRAR",
        suggestStats: {
          validationStatus: "VALID",
          parameterValidationStatus: "VALID_PARAMETERS",
          clientName: "youtube-music",
          searchMethod: "ENTER_KEY",
          inputMethods: ["KEYBOARD"],
          originalQuery: "metallica",
          availableSuggestions: [
            { index: 0, type: 0 },
            { index: 1, type: 0 },
            { index: 2, type: 0 },
            { index: 3, type: 0 },
            { index: 4, type: 0 },
            { index: 5, type: 0 },
            { index: 6, type: 46 },
            { index: 7, type: 46 },
            { index: 8, type: 46 },
          ],
          zeroPrefixEnabled: true,
          firstEditTimeMsec: 16126,
          lastEditTimeMsec: 23966,
        },
        inlineSettingStatus: "INLINE_SETTING_STATUS_ON",
      }),
    }
  );

  const json = await fetchedAlbumsStructure.json();

  const albumsContents = JSONPath({
    path: "$..musicResponsiveListItemRenderer",
    json,
    eval: "native",
  }) as any[];

  console.log("************ BEGIN: fetch-albums 99 ************");
  console.log(albumsContents.length);
  console.log("************ END:   fetch-albums 99 ************");
  return albumsContents.map((albumContent, index) => {
    const title = JSONPath({
      path: "$..flexColumns[0]..runs[0].text",
      json: albumContent,
      eval: "native",
    });

    const year = JSONPath({
      path: "$..flexColumns[1]..runs[-1:].text",
      json: albumContent,
      eval: "native",
    });
    const browseId = JSONPath({
      path: "$.navigationEndpoint.browseEndpoint.browseId",
      json: albumContent,
      eval: "native",
    });
    const info = JSONPath({
      path: "$..flexColumns[1]..runs[*].text",
      json: albumContent,
      eval: "native",
    }).join(" ");
    const thumbnailUrl = JSONPath({
      path: "$..thumbnails[1]",
      json: albumContent,
      eval: "native",
    })[0];

    return {
      browseId,
      year,
      title,
      info,
      thumbnailUrl,
    };
  }).sort((a, b) => a.year - b.year);
};

export default fetchAlbums;
