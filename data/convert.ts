interface OutputCommon {
  id: string;
}

interface TextOutput extends OutputCommon {
  type: "text";
  value: string;
}

interface ImageOutput extends OutputCommon {
  type: "image";
  value: string;
}

type BlockOutput = TextOutput | ImageOutput;
export type ConvertBlockOutput = BlockOutput;

interface Block {
  value: {
    id: string;
    type: string;
    properties: any;
  };
}

export const convertBlock = (block: Block): BlockOutput => {
  switch (block.value.type) {
    case "text":
      if (!block.value.properties) {
        break;
      }
      return {
        id: block.value.id,
        type: block.value.type,
        value: block.value.properties.title[0][0]
      };
    case "image":
      return {
        id: block.value.id,
        type: block.value.type,
        value: `/api/image?url=${encodeURIComponent(
          block.value.properties.source[0][0]
        )}`
      };
    default:
      break;
  }
};

interface Collection {
  result: {
    type: string;
    blockIds: string[];
  };
  recordMap: {
    collection: any;
    block: any;
  };
}

interface CollectionItem {
  title: string;
  id: string;
  createdAt: number;
}

type CollectionOutput = CollectionItem[];
export type ConvertCollectionOutput = CollectionOutput;

export const convertCollection = (
  collectionData: Collection
): CollectionOutput => {
  const {
    recordMap: { block },
    result: { blockIds }
  } = collectionData;

  return blockIds.map(blockId => {
    const item = block[blockId];

    return {
      id: blockId,
      title: item.value.properties.title[0][0],
      createdAt: item.value.created_time
    };
  });
};
