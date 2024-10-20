import { getPlaiceholder } from "plaiceholder";

async function getBlurData(src: string) {
  if (typeof src !== "string") {
    throw new Error("Source must be a valid string.");
  }

  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const data = await getPlaiceholder(buffer);
  return data;
}

export { getBlurData };
