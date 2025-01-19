import React, { useState } from 'react';

interface TreeNode {
  id?: number;
  name: string;
  children?: TreeNode[];
  data?: string;
}

interface TagViewProps {
  tree: TreeNode;
  onExport: (tree: TreeNode) => void;
}

const TagView: React.FC<TagViewProps> = ({ tree, onExport }) => {
  const [expanded, setExpanded] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [localTree, setLocalTree] = useState<TreeNode>(tree);

  const handleToggle = () => setExpanded(!expanded);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTree({ ...localTree, data: e.target.value });
  };

  const handleAddChild = () => {
    const newChild: TreeNode = { name: 'New Child', data: 'Data' };
    if (localTree.data !== undefined) {
      setLocalTree({
        ...localTree,
        children: [newChild],
        data: undefined,
      });
    } else {
      setLocalTree({
        ...localTree,
        children: [...(localTree.children || []), newChild],
      });
    }
  };

  const handleNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLocalTree({ ...localTree, name: (e.target as HTMLInputElement).value });
      setEditingName(false);
    }
  };

  return (
    <div className="border rounded p-4 mb-2">
      <div className="flex items-center mb-2">
        <button onClick={handleToggle} className="mr-2">
          {expanded ? 'v' : '>'}
        </button>
        {editingName ? (
          <input
            type="text"
            defaultValue={localTree.name}
            onKeyPress={handleNameChange}
            autoFocus
            className="border rounded px-2 py-1"
          />
        ) : (
          <h3
            onClick={() => setEditingName(true)}
            className="font-bold cursor-pointer bg-blue-500 text-white px-2 py-1 rounded"
          >
            {localTree.name}
          </h3>
        )}
        <button onClick={handleAddChild} className="ml-auto bg-green-500 text-white px-2 py-1 rounded">
          Add Child
        </button>
      </div>
      {expanded && (
        <>
          {localTree.data !== undefined ? (
            <input
              type="text"
              value={localTree.data}
              onChange={handleDataChange}
              className="w-full border rounded px-2 py-1 mb-2"
            />
          ) : (
            localTree.children?.map((child, index) => (
              <TagView key={index} tree={child} onExport={onExport} />
            ))
          )}
        </>
      )}
      <button onClick={() => onExport(localTree)} className="bg-blue-500 text-white px-2 py-1 rounded">
        Export
      </button>
    </div>
  );
};

export default TagView;

