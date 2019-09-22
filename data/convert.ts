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

type Output = TextOutput | ImageOutput;

export type ConvertOutput = Output;

interface Block {
  value: {
    id: string;
    type: string;
    properties: any;
  };
}

export const convertBlock = (block: Block): Output => {
  switch (block.value.type) {
    case "text":
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
