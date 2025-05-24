import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import styles from "./FilterBox.style";

type FilterBoxProps = {
  tagsByCategory: {
    categoryName: string | null;
    name: string;
    tagId: string;
    categoryId: string;
  }[] | undefined
}

const FilterBox = ({ tagsByCategory }: FilterBoxProps) => {
  const categories = [...new Set(tagsByCategory?.map(tag => tag.categoryName))];
  return (
    <div style={styles.container}>
      <div style={styles.categoriesBox}>
        {categories.map(category => {
          return (<>
            <Typography sx={{ fontWeight: "700" }} key={category}>{category}</Typography>
            {Array.from(
              new Map(tagsByCategory?.map(item => [item.name, item])).values()
            )?.map(tag =>
              tag.categoryName === category && <FormControlLabel key={tag.tagId} control={<Checkbox sx={{
                '&.Mui-checked': {
                  color: "black",
                },
              }} />} label={tag.name} />
            )}
          </>)
        })}
      </div>    </div>
  );
};

export default FilterBox;
