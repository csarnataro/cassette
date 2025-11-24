import { Song } from "@/domain/song";
import { JSONPath } from "jsonpath-plus";

const fetchAlbumSongs = async (browseId: string): Promise<Song[]> => {
  if (!browseId) {
    return Promise.resolve([]);
  }

  const headers: Record<string, string> = {};
  headers["accept"] = "*/*";
  headers["accept-language"] = "en-US,en;q=0.9";
  headers["authorization"] =
    "SAPISIDHASH 1762727104_09b01246ef25ce691d4727b0bb9733e3e372fea1_u SAPISID1PHASH 1762727104_09b01246ef25ce691d4727b0bb9733e3e372fea1_u SAPISID3PHASH 1762727104_09b01246ef25ce691d4727b0bb9733e3e372fea1_u";
  headers["content-type"] = "application/json";
  headers["dnt"] = "1";
  headers["origin"] = "https://music.youtube.com";
  headers["priority"] = "u=1, i";
  headers["referer"] = "https://music.youtube.com/search?q=justice+for+all";
  headers["sec-ch-ua"] =
    '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"';
  headers["sec-ch-ua-arch"] = '"arm"';
  headers["sec-ch-ua-bitness"] = '"64"';
  headers["sec-ch-ua-form-factors"] = '"Desktop"';
  headers["sec-ch-ua-full-version"] = '"141.0.7390.123"';
  headers["sec-ch-ua-full-version-list"] =
    '"Google Chrome";v="141.0.7390.123", "Not?A_Brand";v="8.0.0.0", "Chromium";v="141.0.7390.123"';
  headers["sec-ch-ua-mobile"] = "?0";
  headers["sec-ch-ua-model"] = '""';
  headers["sec-ch-ua-platform"] = '"macOS"';
  headers["sec-ch-ua-platform-version"] = '"15.6.1"';
  headers["sec-ch-ua-wow64"] = "?0";
  headers["sec-fetch-dest"] = "empty";
  headers["sec-fetch-mode"] = "same-origin";
  headers["sec-fetch-site"] = "same-origin";
  headers["sec-gpc"] = "1";
  headers["user-agent"] =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
  headers["x-browser-channel"] = "stable";
  headers["x-browser-copyright"] =
    "Copyright 2025 Google LLC. All rights reserved.";
  headers["x-browser-validation"] = "qSH0RgPhYS+tEktJTy2ahvLDO9s=";
  headers["x-browser-year"] = "2025";
  headers["x-client-data"] =
    "CKm1yQEIirbJAQiktskBCKmdygEIy5bLAQiWocsBCIagzQEI/aXOAQjLi88BCI2OzwEI7o7PAQimj88BCJKRzwEI8JPPARjo5M4BGLKGzwEYpYfPARiYiM8B";
  headers["x-goog-authuser"] = "0";
  headers["x-goog-visitor-id"] =
    "CgtQU1RLU3JuaW9VYyjun8TIBjInCgJJVBIhEh0SGwsMDg8QERITFBUWFxgZGhscHR4fICEiIyQlJiBT";
  headers["x-origin"] = "https://music.youtube.com";
  headers["x-youtube-bootstrap-logged-in"] = "true";
  headers["x-youtube-client-name"] = "67";
  headers["x-youtube-client-version"] = "1.20251103.03.00";

  const fetchedSongsResponse = await fetch(
    `https://music.youtube.com/youtubei/v1/browse?prettyPrint=false`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        context: {
          client: {
            hl: "en",
            gl: "IT",
            remoteHost: "2a01:e11:1407:b4a0:bc66:2014:f010:8e8",
            deviceMake: "Apple",
            deviceModel: "",
            visitorData:
              "CgtQU1RLU3JuaW9VYyjun8TIBjInCgJJVBIhEh0SGwsMDg8QERITFBUWFxgZGhscHR4fICEiIyQlJiBT",
            userAgent:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36,gzip(gfe)",
            clientName: "WEB_REMIX",
            clientVersion: "1.20251103.03.00",
            osName: "Macintosh",
            osVersion: "10_15_7",
            originalUrl: "https://music.youtube.com/",
            screenPixelDensity: 2,
            platform: "DESKTOP",
            clientFormFactor: "UNKNOWN_FORM_FACTOR",
            configInfo: {
              appInstallData:
                "CO6fxMgGEJ7QsAUQlP6wBRDlsoATEJSD0BwQtZfQHBDzkNAcEPyyzhwQg57QHBDzs4ATEPKd0BwQm_bPHBCln9AcEJTyzxwQzOvPHBDJ968FELnZzhwQyPfPHBDYltAcEK21gBMQi_fPHBC36v4SENPhrwUQgc3OHBCtotAcEOK4sAUQgpTQHBCM6c8cEN7pzxwQq53PHBCW288cENr3zhwQ9ZfQHBDwnc8cEK7WzxwQvbauBRCfp9AcEJX3zxwQmY2xBRC45M4cEJzXzxwQvZmwBRD50M8cEIiHsAUQh6zOHBDiuM8cEL2KsAUQp6XQHBD7_88cENHgzxwQ3rzOHBD2q7AFEMGP0BwQibDOHBCEh9AcEMzfrgUQu9nOHBCxsIATENmc0BwQqKbQHBDsjNAcKkRDQU1TTGhVdC1acS1ETWVVRXVnQ2VMdlY4QXN5djFfcDFRVUR6ZjhGb1lBR29pNmtZcC1RQnZZUDd6RE42ZUllSFFjPTAA",
              coldConfigData:
                "CO6fxMgGGjJBT2pGb3gyNXRXWjBMY0ZlV3JheGhDM25xNGswb1Bkd3hOcDJoWHpBdE9CbVR4RXZ6dyIyQU9qRm94MXBWbHBtODhiU1B6YkVocFNVelNfNG05OEFXbU1laHJVUGV2emNDZzFVZXc%3D",
              coldHashData:
                "CO6fxMgGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGO6fxMgGMjJBT2pGb3gyNXRXWjBMY0ZlV3JheGhDM25xNGswb1Bkd3hOcDJoWHpBdE9CbVR4RXZ6dzoyQU9qRm94MXBWbHBtODhiU1B6YkVocFNVelNfNG05OEFXbU1laHJVUGV2emNDZzFVZXc%3D",
              hotHashData:
                "CO6fxMgGEhMyOTA0NDUyNDMyNjYxODQzODY3GO6fxMgGMjJBT2pGb3gyNXRXWjBMY0ZlV3JheGhDM25xNGswb1Bkd3hOcDJoWHpBdE9CbVR4RXZ6dzoyQU9qRm94MXBWbHBtODhiU1B6YkVocFNVelNfNG05OEFXbU1laHJVUGV2emNDZzFVZXc%3D",
            },
            screenDensityFloat: 2,
            userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
            timeZone: "Europe/Rome",
            browserName: "Chrome",
            browserVersion: "141.0.0.0",
            acceptHeader:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            deviceExperimentId:
              "ChxOelUzTURnME9UazJNelk0T1RrMk5EQXdOUT09EO6fxMgGGO6fxMgG",
            rolloutToken: "CIadp6aS1ffJ0gEQhdiJtfuxjQMYk4XP9s7lkAM%3D",
            screenWidthPoints: 1134,
            screenHeightPoints: 848,
            utcOffsetMinutes: 60,
            musicAppInfo: {
              pwaInstallabilityStatus:
                "PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED",
              webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
              storeDigitalGoodsApiSupportStatus: {
                playStoreDigitalGoodsApiSupportStatus:
                  "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED",
              },
            },
          },
          user: {
            lockedSafetyMode: false,
          },
          request: {
            useSsl: true,
            internalExperimentFlags: [],
            consistencyTokenJars: [],
          },
          clickTracking: {
            clickTrackingParams:
              "CLICENRoGAAiEwjY7NqPjuaQAxVfwkIFHU4cAZfKAQTbUhlT",
          },
          adSignalsInfo: {
            params: [
              {
                key: "dt",
                value: "1762725870170",
              },
              {
                key: "flash",
                value: "0",
              },
              {
                key: "frm",
                value: "0",
              },
              {
                key: "u_tz",
                value: "60",
              },
              {
                key: "u_his",
                value: "5",
              },
              {
                key: "u_h",
                value: "1080",
              },
              {
                key: "u_w",
                value: "1920",
              },
              {
                key: "u_ah",
                value: "1055",
              },
              {
                key: "u_aw",
                value: "1920",
              },
              {
                key: "u_cd",
                value: "24",
              },
              {
                key: "bc",
                value: "31",
              },
              {
                key: "bih",
                value: "848",
              },
              {
                key: "biw",
                value: "1134",
              },
              {
                key: "brdim",
                value: "673,-1030,673,-1030,1920,-1055,1134,969,1134,848",
              },
              {
                key: "vis",
                value: "1",
              },
              {
                key: "wgl",
                value: "true",
              },
              {
                key: "ca_type",
                value: "image",
              },
            ],
          },
        },
        browseId,
      }),
    }
  );

  const json = await fetchedSongsResponse.json();

  const songs = JSONPath({
    path: "$..musicShelfRenderer.contents",
    json,
    eval: "native",
  }) as any[];

  return songs[0].map((song: any) => {
    const videoId = JSONPath({
      path: "$..navigationEndpoint.watchEndpoint.videoId",
      json: song,
      eval: "native",
    })[0];
    const playlistId = JSONPath({
      path: "$..navigationEndpoint.watchEndpoint.playlistId",
      json: song,
      eval: "native",
    })[0];
    const title = JSONPath({
      path: "$..flexColumns[0]..runs[0].text",
      json: song,
      eval: "native",
    });

    return { title, videoId, playlistId };
  });
};

export default fetchAlbumSongs;
