import { loadPageChunk, queryCollection } from "./notion";
import { convertBlock, ConvertOutput } from "./convert";

interface Output {
  sections: Array<ConvertOutput>;
}

const pageId = "e740a8ab-2c00-4ea7-8fa0-54c678d40075";

export const getData = async (): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  const contentIds: string[] = page.value.content;

  const homeBlocks = contentIds.map(id => blocks[id]);

  const tableCollection = homeBlocks.find(
    block => block.value.type === "collection_view"
  );

  const collectionData = await queryCollection({
    collectionId: tableCollection.collection_id,
    collectionViewId: tableCollection.view_ids[0]
  });

  const sections = homeBlocks
    .filter(block => {
      if (block.value.type === "image") {
        return true;
      }
      return false;
    })
    .map(convertBlock);

  return {
    sections
  };
};

export type HomeData = Output;
