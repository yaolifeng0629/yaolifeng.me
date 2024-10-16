import sizeOf from "image-size";

export async function getImageDimensionByUri(
  uri: string,
  useFullSize = false,
): Promise<{ width: number; height: number; uri: string } | null> {
  const headers: Record<string, string> = {};

  if (!useFullSize) headers.Range = "bytes=0-10240";

  try {
    const response = await fetch(uri, { headers });
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dimensions = sizeOf(buffer);
    if (!(dimensions.width && dimensions.height)) throw new Error("Could not determine image dimensions.");

    return {
      width: dimensions.width,
      height: dimensions.height,
      uri,
    };
  } catch {
    if (!useFullSize) return getImageDimensionByUri(uri, true);

    return null;
  }
}
