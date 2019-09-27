import { loadPageChunk, queryCollection } from "./notion";
import {
  convertBlock,
  convertCollection,
  ConvertBlockOutput,
  ConvertCollectionOutput
} from "./convert";

interface Output {
  posts: ConvertCollectionOutput;
  sections: ConvertBlockOutput[];
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
    collectionId: tableCollection.value.collection_id,
    collectionViewId: tableCollection.value.view_ids[0]
  });

  const posts = convertCollection(collectionData);

  const availableType = ["image", "text"];

  const sections = homeBlocks
    .filter(block => {
      return availableType.indexOf(block.value.type) > -1;
    })
    .map(convertBlock);

  return {
    posts,
    sections
  };
};

export type HomeData = Output;
