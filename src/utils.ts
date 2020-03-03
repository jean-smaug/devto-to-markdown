export function wrapValueWithQuotes(str: string) {
  const [key, ...rest] = str.split(":");

  const value = rest.join(":").trim();

  if (!value.trim() || (value.startsWith('"') && value.endsWith('"'))) {
    return str.trim();
  }

  return `${key}: "${value}"`;
}

export function insertInHead(
  body: string,
  additionalHeaders: Record<string, number | string>
) {
  const splitedBody = body.split("---");
  const headers = splitedBody[1];

  const formatedAdditionalHeaders = Object.keys(additionalHeaders).reduce(
    (acc: string[], header: string) => {
      return [...acc, `${header}: "${additionalHeaders[header]}"`];
    },
    []
  );
  const cleanedHeaders = headers.split("\n").filter(Boolean);

  const allHeader = [
    "",
    ...[...cleanedHeaders, ...formatedAdditionalHeaders].map(
      wrapValueWithQuotes
    ),
    ""
  ].join("\n");

  splitedBody[1] = allHeader;

  return splitedBody.join("---");
}
