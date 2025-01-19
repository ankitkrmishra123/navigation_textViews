import React, { useState, useEffect } from 'react';
import TagView from './components/TagView';
import { fetchTrees, saveTree, updateTree } from './api';

interface TreeNode {
  id?: number;
  name: string;
  children?: TreeNode[];
  data?: string;
}

const App: React.FC = () => {
  const [trees, setTrees] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrees = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedTrees = await fetchTrees();
        setTrees(fetchedTrees);
      } catch (err) {
        setError('Failed to load trees. Please try again later.');
        console.error('Error loading trees:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTrees();
  }, []);

  const handleExport = async (tree: TreeNode) => {
    try {
      setError(null);
      const exportedTree = JSON.stringify(tree, ['name', 'children', 'data'], 2);
      console.log(exportedTree);

      if (tree.id) {
        await updateTree(tree.id, tree);
      } else {
        const savedTree = await saveTree(tree);
        setTrees([...trees, savedTree]);
      }
    } catch (err) {
      setError('Failed to export tree. Please try again later.');
      console.error('Error exporting tree:', err);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nested Tags Tree</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
      {trees.map((tree, index) => (
        <div key={index} className="mb-8">
          <TagView tree={tree} onExport={handleExport} />
        </div>
      ))}
    </div>
  );
};

export default App;

