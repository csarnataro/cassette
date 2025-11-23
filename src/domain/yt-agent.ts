export interface YouTubeAgent {
  clientName: string;
  clientVersion: string;
  api_key: string;
  userAgent: string;
  osVersion?: string;
  referer?: string;
  visitorData?: string;
}

export interface YouTubeLocale {
  gl: string;
  hl: string;
}

export interface YouTubeContext {
  clientName: string;
  clientVersion: string;
  osVersion?: string;
  gl: string;
  hl: string;
  visitorData?: string;
}

export const toContext = (
  agent: YouTubeAgent,
  locale: YouTubeLocale,
  visitorData?: string
): YouTubeContext => {
    return {
        clientName: agent.clientName,
        clientVersion: agent.clientVersion,
        osVersion: agent.osVersion,
        gl: locale.gl,
        hl: locale.hl,
        visitorData
    }
};
