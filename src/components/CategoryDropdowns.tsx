// components/CategoryDropdowns.tsx
import type { SelectChangeEvent } from '@mui/material';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

export type Category = {
  id: number;
  name: string;
  description: string | null;
  children: Category[] | null;
  slug?: string;
  disable_shipping: number;
};

export type ApiResponse = {
  code: number;
  msg: string;
  data: {
    categories: Category[];
  };
};

const CategoryDropdowns: React.FC = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('/api/categories');
      const data: ApiResponse = await res.json();
      setParentCategories(data.data.categories);
    }
    fetchCategories();
  }, []);

  const handleParentChange = (event: SelectChangeEvent<string>) => {
    const id = Number(event.target.value);
    setSelectedParent(id);

    const parentCategory = parentCategories.find((cat) => cat.id === id);
    setSubCategories(parentCategory?.children || []);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '2rem' }}>
        <InputLabel id="parent-category-label">Parent Category</InputLabel>
        <Select
          labelId="parent-category-label"
          onChange={handleParentChange}
          defaultValue=""
          label="Parent Category"
          sx={{ fontSize: '1.2rem' }}
        >
          {parentCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id} sx={{ fontSize: '2rem' }}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedParent && (
        <FormControl fullWidth variant="outlined">
          <InputLabel id="sub-category-label">Sub Category</InputLabel>
          <Select labelId="sub-category-label" defaultValue="" label="Sub-category" sx={{ fontSize: '1.2rem' }}>
            {subCategories.map((subCat) => (
              <MenuItem key={subCat.id} value={subCat.id} sx={{ fontSize: '2rem' }}>
                {subCat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Container>
  );
};

export default CategoryDropdowns;
