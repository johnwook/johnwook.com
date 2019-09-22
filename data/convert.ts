interface Output {
  id: string;
  type: "text" | "image";
  value: string;
}

interface Block {
  value: {
    id: string;
    type: string;
    properties: any;
  };
}

export default (block: Block): Output => {
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
