const DEFAULT_CFG: string[] = [
  "VISITOR_DATA",
  "INNERTUBE_CONTEXT_CLIENT_NAME",
  "INNERTUBE_CLIENT_VERSION",
  "DEVICE",
  "PAGE_CL",
  "PAGE_BUILD_LABEL",
  "INNERTUBE_API_KEY",
  "INNERTUBE_CLIENT_NAME",
  "INNERTUBE_CLIENT_VERSION",
  "INNERTUBE_API_VERSION",
  "GL",
  "HL",
] as string[];

/**
 * Extracts a list of configurations from the homepage of www.youtube.com
 * 
 * @param html the source code of www.youtube.com (as html)
 * @param validCfgKeys a list of strings of valid configurations 
 *  to be extracted, or "*", or (if undefined) a predefined list
 *  will be used
 * @returns an object of youtube configurations in the form
 * ```
   { 
    "VISITOR_DATA": "Value1",
    "INNERTUBE_CONTEXT_CLIENT_NAME": "Value2",
    "INNERTUBE_CLIENT_VERSION": "Value3",
    "DEVICE": "Value4",
    ...
  }
```
 */
function extract(
  html: string,
  validCfgKeys: string[] | "*" = DEFAULT_CFG
): Record<string, any> {
  const matches = html.match(/ytcfg\.set\({.*}\)/g) || [];
  const matchSets = matches
    .map((match) => {
      const cfg = match.slice(10, -1);
      let parsedCfg = {};
      try {
        parsedCfg = JSON.parse(cfg);
      } catch (err) {
        // do nothing
      }
      return parsedCfg;
    })
    .filter(
      (o: any) =>
        Boolean(o) || Boolean(o.length) || Boolean(Object.keys(o).length)
    );

  // here I have am array of objects like:
  // [ {"PROP1": "VALUE1", "PROP2": "VALUE2"},  {"PROP3": "VALUE3"}]

  const merged = mergeObjects(...matchSets);

  // here I have an object like:
  // {"PROP1": "VALUE1", "PROP2": "VALUE2", "PROP3": "VALUE3"}

  if (validCfgKeys === "*") {
    return merged;
  } else {
    return Object.keys(merged)
      .filter((k: string) => validCfgKeys.includes(k))
      .reduce((acc, curr) => ({ ...acc, ...{ [curr]: merged[curr] } }), {});
  }
}

function mergeObjects(...obj: any[]) {
  return obj.reduce((acc: any, curr: any) => {
    return { ...acc, ...curr };
  }, {} as unknown as Record<string, any>);
}

export { extract, mergeObjects };
