import { PlayableSong } from "@/domain/playable-song";
import { JSONPath } from "jsonpath-plus";

const callPlayer = async (
  videoId: string,
  playlistId: string
): Promise<PlayableSong | undefined> => {
  if (!videoId) {
    return Promise.resolve(undefined);
  }

  const headers: Record<string, string> = {};
  headers["accept"] = "*/*";
  headers["accept-language"] = "en-US,en;q=0.9";
  headers["authorization"] =
    "SAPISIDHASH 1762732696_c327ea6cc22c5b10857cdd1cc46a2ce7f6e0f1b1_u SAPISID1PHASH 1762732696_c327ea6cc22c5b10857cdd1cc46a2ce7f6e0f1b1_u SAPISID3PHASH 1762732696_c327ea6cc22c5b10857cdd1cc46a2ce7f6e0f1b1_u";
  headers["content-type"] = "application/json";
  headers["dnt"] = "1";
  headers["origin"] = "https://music.youtube.com";
  headers["priority"] = "u=1, i";
  headers["referer"] =
    "https://music.youtube.com/playlist?list=RDCLAK5uy_nNGk2yOsNF2AWjk3FbtO8FjvQhT1FUi_c";
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
  headers["sec-fetch-mode"] = "cors";
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
    "Cgt5bWphdnpCZ05YMCiI1cTIBjInCgJJVBIhEh0SGwsMDg8QERITFBUWFxgZGhscHR4fICEiIyQlJiAQ";
  headers["x-origin"] = "https://music.youtube.com";
  headers["x-youtube-bootstrap-logged-in"] = "true";
  headers["x-youtube-client-name"] = "67";
  headers["x-youtube-client-version"] = "1.20251103.03.00";
  const fetchedAlbumsStructure = await fetch(
    `https://music.youtube.com/youtubei/v1/player?prettyPrint=false`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        videoId,
        context: {
          client: {
            hl: "en",
            gl: "IT",
            remoteHost: "2a01:e11:1407:b4a0:bc66:2014:f010:8e8",
            deviceMake: "Apple",
            deviceModel: "",
            visitorData:
              "Cgt5bWphdnpCZ05YMCiI1cTIBjInCgJJVBIhEh0SGwsMDg8QERITFBUWFxgZGhscHR4fICEiIyQlJiAQ",
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
                "CIjVxMgGEKWf0BwQibDOHBDlsoATEIOe0BwQlPLPHBD2q7AFELWX0BwQlP6wBRC36v4SEPCdzxwQq53PHBDJ968FEPnQzxwQlffPHBC9tq4FEIeszhwQ4rjPHBCM6c8cENr3zhwQiIewBRDe6c8cEMzfrgUQ3rzOHBC9irAFEPv_zxwQhIfQHBC72c4cEMGP0BwQvZmwBRCb9s8cEIv3zxwQgpTQHBDiuLAFEIHNzhwQrbWAExDzkNAcEK7WzxwQyPfPHBDM688cEJSD0BwQltvPHBDyndAcELjkzhwQudnOHBCZjbEFEKel0BwQnNfPHBCfp9AcENHgzxwQ87OAExCtotAcEPWX0BwQntCwBRD8ss4cENiW0BwQ0-GvBRCxsIATEKim0BwQ2ZzQHBDsjNAcKkRDQU1TTGhVdC1acS1ETWVVRXVnQ2VMdlY4QXN5djFfcDFRVUR6ZjhGb1lBR29pNmtZcC1RQnZZUDd6RE42ZUllSFFjPTAA",
              coldConfigData:
                "CIjVxMgGGjJBT2pGb3gyNXRXWjBMY0ZlV3JheGhDM25xNGswb1Bkd3hOcDJoWHpBdE9CbVR4RXZ6dyIyQU9qRm94MlZkWG1RWGQtZmc5RGRjUFJEOTlFTF9JaHgyLXpzcHdoVTR4UEZKODU2MFE%3D",
              coldHashData:
                "CIjVxMgGEhM4MzcyMjg4Nzg1MDY2MDg0NzkyGIjVxMgGMjJBT2pGb3gyNXRXWjBMY0ZlV3JheGhDM25xNGswb1Bkd3hOcDJoWHpBdE9CbVR4RXZ6dzoyQU9qRm94MlZkWG1RWGQtZmc5RGRjUFJEOTlFTF9JaHgyLXpzcHdoVTR4UEZKODU2MFE%3D",
              hotHashData:
                "CIjVxMgGEhMyOTA0NDUyNDMyNjYxODQzODY3GIjVxMgGMjJBT2pGb3gyNXRXWjBMY0ZlV3JheGhDM25xNGswb1Bkd3hOcDJoWHpBdE9CbVR4RXZ6dzoyQU9qRm94MlZkWG1RWGQtZmc5RGRjUFJEOTlFTF9JaHgyLXpzcHdoVTR4UEZKODU2MFE%3D",
            },
            screenDensityFloat: 2,
            userInterfaceTheme: "USER_INTERFACE_THEME_DARK",
            timeZone: "Europe/Rome",
            browserName: "Chrome",
            browserVersion: "141.0.0.0",
            acceptHeader:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            deviceExperimentId:
              "ChxOelUzTURnM09USXhNelF3TmpRMk5EY3dOUT09EIjVxMgGGIjVxMgG",
            rolloutToken: "CIadp6aS1ffJ0gEQhdiJtfuxjQMYk4XP9s7lkAM%3D",
            screenWidthPoints: 1616,
            screenHeightPoints: 848,
            utcOffsetMinutes: 60,
            connectionType: "CONN_CELLULAR_4G",
            playerType: "UNIPLAYER",
            tvAppInfo: {
              livingRoomAppMode: "LIVING_ROOM_APP_MODE_UNSPECIFIED",
            },
            clientScreen: "WATCH_FULL_SCREEN",
          },
          user: { lockedSafetyMode: false },
          request: {
            useSsl: true,
            internalExperimentFlags: [],
            consistencyTokenJars: [],
          },
          clientScreenNonce: "iDoFaMx4RQs_jXE_",
          adSignalsInfo: {
            params: [
              { key: "dt", value: "1762732681429" },
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
              { key: "biw", value: "1616" },
              {
                key: "brdim",
                value: "191,-1030,191,-1030,1920,-1055,1616,969,1616,848",
              },
              { key: "vis", value: "1" },
              { key: "wgl", value: "true" },
              { key: "ca_type", value: "image" },
            ],
          },
          clickTracking: {
            clickTrackingParams:
              "CBMQyN4CGAEiEwj2mLb_ouaQAxXQz0kHHUn0BcTKAQTbUhlT",
          },
        },
        playbackContext: {
          contentPlaybackContext: {
            html5Preference: "HTML5_PREF_WANTS",
            lactMilliseconds: "9",
            referer:
              "https://music.youtube.com/playlist?list=RDCLAK5uy_nNGk2yOsNF2AWjk3FbtO8FjvQhT1FUi_c",
            signatureTimestamp: 20396,
            autoCaptionsDefaultOn: false,
            mdxContext: {},
            vis: 10,
          },
          devicePlaybackCapabilities: {
            supportsVp9Encoding: true,
            supportXhr: true,
          },
        },
        cpn: "eJZiiwyFn8ec0WB8",
        playlistId,
        captionParams: {},
      }),
    }
  );

  const json = await fetchedAlbumsStructure.json();

  const playerVars = JSONPath({
    path: "$..playerVars",
    json,
    eval: "native",
  })[0] as string;

  if (typeof playerVars === "string") {
    const playerVar = playerVars.split("&").find(v => v.startsWith("player_response="));
    const decodedVars = JSON.parse(decodeURIComponent(playerVar!.substring("player_response=".length)));
    console.log("************ BEGIN: call-player 59 ************");
    console.log(Object.keys(decodedVars));
    console.log("************ MID. : call-player 59 ************");
    console.log(decodedVars.streamingData);
    console.log("************ END:   call-player 59 ************");
  }

  return { title: "Boh", videoId: "Boh", playlistId: "boh", playerUrl: "boh" };
  // const albumsContents = JSONPath({
  //   path: "$..musicResponsiveListItemRenderer",
  //   json,
  //   eval: "native",
  // }) as any[];

  // console.log("************ BEGIN: fetch-albums 99 ************");
  // console.log(albumsContents.length);
  // console.log("************ END:   fetch-albums 99 ************");
  // return albumsContents.map((albumContent, index) => {
  //   const title = JSONPath({
  //     path: "$..flexColumns[0]..runs[0].text",
  //     json: albumContent,
  //     eval: "native",
  //   });

  //   const year = JSONPath({
  //     path: "$..flexColumns[1]..runs[-1:].text",
  //     json: albumContent,
  //     eval: "native",
  //   });
  //   const browseId = JSONPath({
  //     path: "$.navigationEndpoint.browseEndpoint.browseId",
  //     json: albumContent,
  //     eval: "native",
  //   });
  //   const info = JSONPath({
  //     path: "$..flexColumns[1]..runs[*].text",
  //     json: albumContent,
  //     eval: "native",
  //   }).join(" ");
  //   const thumbnailUrl = JSONPath({
  //     path: "$..thumbnails[1]",
  //     json: albumContent,
  //     eval: "native",
  //   })[0];

  //   return {
  //     browseId,
  //     year,
  //     title,
  //     info,
  //     thumbnailUrl,
  //   };
  // });
};

export default callPlayer;
