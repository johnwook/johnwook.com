import { queryCollection } from "./notion";
import { convertCollection, ConvertCollectionOutput } from "./convert";

interface Input {
  tid: string;
}

interface Output {
  tid: string;
  posts: ConvertCollectionOutput["posts"];
}

const collectionId = "7226e9a0-9a13-454b-866c-03ba71fcb423";
const collectionViewId = "e34c69b8-2bba-42f0-bcea-e581cc6f18ff";

export const getData = async ({ tid }: Input): Promise<Output> => {
  const collectionData = await queryCollection({
    collectionId,
    collectionViewId,
    query: {
      filter: [
        {
          property: "1Ote",
          comparator: "enum_contains",
          value: tid
        }
      ],
      sort: [
        {
          direction: "descending",
          property: "ns3x",
          type: "created_time"
        }
      ]
    }
  });

  const { posts } = convertCollection(collectionData);

  return {
    tid,
    posts
  };
};

export type TagData = Output;
