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
    dispatch(
      addCategory({
        id: crypto.randomUUID(),
        name: cat.trim().toUpperCase(),
        type: isExpense ? 'expense' : 'income',
        username: currentUser as string,
      })
    );
    setCategory(cat.trim().toUpperCase());
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
