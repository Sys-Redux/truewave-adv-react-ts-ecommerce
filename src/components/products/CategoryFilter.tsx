import { useCategories } from '../../hooks/useProducts';

interface CategoryFilterProps {
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
};

export const CategoryFilter = ({
    selectedCategory,
    onCategoryChange,
}: CategoryFilterProps) => {
    const { data: categories, isLoading, error } = useCategories();

    if (isLoading) {
        return (
            <div className='flex items-center gap-3 bg-[--color-bg-secondary] px-4 py-3 rounded-lg
                border border-[--color-border]'>
                <div className='w-4 h-4 border-2 border-[--color-accent] border-t-transparent
                    rounded-full animate-spin' />
                <span className='text-[--color-text-secondary] text-sm'>
                    Loading Categories...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-[--color-secondary] px-4 py-3 rounded-lg border border-[--color-error]
                text-sm'>
                Error loading categories.
            </div>
        );
    }

    return (
        <main className='flex items-center gap-3 bg-[--color-bg-secondary] px-4 py-3 rounded-lg
            border border-[--color-border] hover:border-[--color-accent] transition-colors'>
                <label
                    htmlFor='category'
                    className='text-[--color-text-primary] font-medium text-sm uppercase tracking-wide'
                >
                    Filter:
                </label>
                <select
                    id='category'
                    value={selectedCategory || ''}
                    onChange={(e) => onCategoryChange(e.target.value || null)}
                    className='bg-[--color-bg-elevated] text-[--color-text-primary] border
                        border-[--color-border-accent] rounded-md px-4 py-2 focus:outline-none
                        focus:border-[--color-accent] focus:glow-cyan cursor-pointer transition-all
                        hover:border-[--color-accent] font-mono text-sm'
                >
                    <option value=''>All Categories</option>
                    {categories?.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </main>
    );
};