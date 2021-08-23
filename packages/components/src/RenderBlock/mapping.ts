import { Data } from '../DataProvider';
import { Identifier } from './Identifier.enum';
import { BaseBlock } from './blocks/BaseBlock';
import { BlockFragment } from './blocks/BlockFragment';
import { Padding } from './blocks/Padding';
import { Title } from './blocks/Title';

export class SchemaDeserializationError extends Error {
  constructor(identifier: Identifier) {
    super(
      `Block with identifier: "${identifier}" does not have a concrete implementation`
    );
    this.name = 'SchemaDeserializationError';
  }
}

const mapping = {
  [Identifier.Title]: Title,
  [Identifier.Padding]: Padding,
  [Identifier.BlockFragment]: BlockFragment,
};

export const getConstructorForIdentifier = (identifier: Identifier) => {
  const block = mapping[identifier];

  if (!block) {
    return null;
  }

  return block;
};

interface PlainBlock extends BaseBlock<{}, keyof Data> {
  Component: never;
  items: PlainBlock[];
}

export const deserializeSchema = (plainSchema: PlainBlock): BaseBlock => {
  const iterate = (block: PlainBlock): BaseBlock => {
    const ConcreteBlock = getConstructorForIdentifier(block.identifier);

    if (!ConcreteBlock) {
      throw new SchemaDeserializationError(block.identifier);
    }

    return new ConcreteBlock({
      accessor: block.accessor,
      metadata: block.metadata,
      items: block.items.map(iterate)
    });
  };

  return iterate(plainSchema);
};
