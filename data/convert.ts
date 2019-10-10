interface OutputCommon {
  id: string;
  createdTime: number;
  lastEditedTime: number;
}

type TextValue = Array<string | Array<string[]>>;

interface TextOutput extends OutputCommon {
  type: "text";
  value: TextValue[];
}

interface ImageOutput extends OutputCommon {
  type: "image";
  value: string;
}

export type TextBlock = TextOutput;
export type ImageBlock = ImageOutput;

interface HeaderOutput extends OutputCommon {
  type: "header";
  value: string;
}

type BlockOutput = TextOutput | ImageOutput | HeaderOutput;
export type ConvertBlockOutput = BlockOutput;

interface Block {
  value: {
    id: string;
    type: string;
    properties: any;
    created_time: number;
    last_edited_time: number;
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
        value: block.value.properties.title,
        createdTime: block.value.created_time,
        lastEditedTime: block.value.last_edited_time
      };
    case "image":
      return {
        id: block.value.id,
        type: block.value.type,
        value: `/api/image?url=${encodeURIComponent(
          block.value.properties.source[0][0]
        )}`,
        createdTime: block.value.created_time,
        lastEditedTime: block.value.last_edited_time
      };
    case "header":
      return {
        id: block.value.id,
        type: block.value.type,
        value: block.value.properties.title[0][0],
        createdTime: block.value.created_time,
        lastEditedTime: block.value.last_edited_time
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
  createdTime: number;
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
      createdTime: item.value.created_time
    };
  });
};
