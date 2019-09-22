interface Output {
  id: string;
  type: "text";
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
    default:
      break;
  }
};
