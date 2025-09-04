// src/components/DynamicList.tsx
import React from 'react';

interface DynamicListProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  addButtonLabel: string;
}

const DynamicList = <T,>({ items, onAdd, onRemove, renderItem, addButtonLabel }: DynamicListProps<T>) => (
  <>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {renderItem(item, index)}
      </React.Fragment>
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
    >
      + {addButtonLabel}
    </button>
  </>
);

export default DynamicList;