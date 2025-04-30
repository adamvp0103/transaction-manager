import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCategory } from '../../features/categories/categoriesSlice';

interface CategoryFormProps {
  onClose: () => void;
  isExpense: boolean;
  setCategory: (category: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onClose,
  isExpense,
  setCategory,
}) => {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const dispatch = useAppDispatch();
  const [cat, setCat] = useState('');

  const handleAdd = () => {
    if (!cat.trim()) {
      alert('Category name cannot be blank.');
      return;
    }
    
    const catId = crypto.randomUUID();

    dispatch(
      addCategory({
        id: catId,
        name: cat.trim().toUpperCase(),
        type: isExpense ? 'expense' : 'income',
        username: currentUser as string,
      })
    );
    setCategory(catId);
    onClose();
  };

  return (
    <div>
      <button onClick={onClose}>Close</button>

      <h2>Add {isExpense ? 'Expense' : 'Income'} Category</h2>

      <input
        value={cat}
        placeholder="Category"
        onChange={(e) => setCat(e.target.value)}
        required
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default CategoryForm;
