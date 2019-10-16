interface OutputCommon {
  id: string;
  createdTime: number;
  lastEditedTime: number;
}

export type TextValue = Array<string | Array<string[]>>;

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
      return {
        id: block.value.id,
        type: block.value.type,
        value: block.value.properties ? block.value.properties.title : [[""]],
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

interface CollectionOutput {
  posts: CollectionItem[];
  tags: Array<{
    id: string;
    value: string;
  }>;
}

export type ConvertCollectionOutput = CollectionOutput;

export const convertCollection = (
  collectionData: Collection
): CollectionOutput => {
  const {
    recordMap: { block, collection },
    result: { blockIds }
  } = collectionData;

  return {
    posts: blockIds.map(blockId => {
      const item = block[blockId];

      return {
        id: blockId,
        title:
          item.value.format.page_icon + " " + item.value.properties.title[0][0],
        createdTime: item.value.created_time
      };
    }),
    tags: collection[Object.keys(collection)[0]].value.schema["1Ote"].options
  };
};
