import { loadPageChunk } from "./notion";
import convert, { ConvertOutput } from "./convert";

interface Input {
  pageId: string;
}

interface Output {
  title: string;
  sections: Array<ConvertOutput>;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];
  const title = page.value.properties.title[0][0];

  const contentIds: string[] = page.value.content;

  const sections = contentIds
    .map(id => blocks[id])
    .filter(block => {
      if (block.value.type === "text" && block.value.properties) {
        return true;
      }

      return false;
    })
    .map(convert);

  return {
    title,
    sections
  };
};

export type PostData = Output;

export const extractPid = (slug: string): string => {
  const regex = /(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/;

  const matched = regex.exec(slug);

  return matched.slice(1, 6).join("-");
};
