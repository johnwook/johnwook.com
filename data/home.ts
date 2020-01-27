import { loadPageChunk, queryCollection } from "./notion";
import {
  convertBlock,
  convertCollection,
  ConvertCollectionOutput,
  TextBlock,
  ImageBlock
} from "./convert";

interface Output {
  cardImage: ImageBlock;
  nowReading: TextBlock;
  posts: ConvertCollectionOutput["posts"];
  tags: ConvertCollectionOutput["tags"];
}

const pageId = "e740a8ab-2c00-4ea7-8fa0-54c678d40075";

export const getData = async (): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  const contentIds: string[] = page.value.content;

  const homeBlocks = contentIds.map(id => blocks[id]);

  const cardImage = convertBlock(
    homeBlocks.find(b => b.value.type === "image")
  ) as ImageBlock;
  const nowReading = convertBlock(
    homeBlocks.find(b => b.value.type === "text")
  ) as TextBlock;

  const tableCollection = homeBlocks.find(
    block => block.value.type === "collection_view"
  );

  const collectionData = await queryCollection({
    collectionId: tableCollection.value.collection_id,
    collectionViewId: tableCollection.value.view_ids[0],
    query: {
      sort: [
        {
          direction: "descending",
          property: "ns3x",
          type: "created_time"
        }
      ]
    }
  });

  const { posts, tags } = convertCollection(collectionData);

  return {
    cardImage,
    nowReading,
    posts,
    tags
  };
};

export type HomeData = Output;
