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
  const targetCategories = useAppSelector((state) =>
    state.categories.categories
      .filter((c) => c.username === currentUser)
      .filter((c) => c.type === (isExpense ? 'expense' : 'income'))
  );

  const dispatch = useAppDispatch();
  const [cat, setCat] = useState('');

  const categoryColors = isExpense
    ? [
        'hsl(0, 100%, 50%)',
        'hsl(0, 100%, 25%)',
        'hsl(0, 100%, 75%)',
        'hsl(0, 50%, 50%)',
        'hsl(30, 100%, 50%)',
        'hsl(30, 100%, 25%)',
        'hsl(30, 100%, 75%)',
        'hsl(330, 100%, 50%)',
        'hsl(330, 100%, 25%)',
        'hsl(330, 100%, 75%)',
      ]
    : [
        'hsl(120, 100%, 50%)',
        'hsl(120, 100%, 25%)',
        'hsl(120, 100%, 75%)',
        'hsl(120, 50%, 50%)',
        'hsl(75, 100%, 50%)',
        'hsl(75, 100%, 25%)',
        'hsl(75, 100%, 75%)',
        'hsl(165, 100%, 50%)',
        'hsl(165, 100%, 25%)',
        'hsl(165, 100%, 75%)',
      ];
  const availableColors = categoryColors.filter((clr) =>
    targetCategories.every((ctg) => ctg.color !== clr)
  );

  const [color, setColor] = useState(availableColors[0]);

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
        color,
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

      <p>Select a color</p>
      {/* Buttons used instead of a select element for better visual customization */}
      {availableColors.map((c) => (
        <button
          key={c}
          disabled={c === color}
          onClick={() => setColor(c)}
          style={{
            backgroundColor: c,
            border: c === color ? '1px solid black' : 'none',
          }}
        ></button>
      ))}

      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default CategoryForm;
