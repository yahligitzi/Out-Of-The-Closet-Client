import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import styles from "./FilterBox.style";

type FilterBoxProps = {
  tagsByCategory:
    | {
        categoryName: string | null;
        name: string;
        tagId: string;
        categoryId: string;
      }[]
    | undefined;
  setChecked: React.Dispatch<
    React.SetStateAction<{ tagId: string; categoryId: string }[]>
  >;
};

const FilterBox = ({ tagsByCategory, setChecked }: FilterBoxProps) => {
  const categories = [
    ...new Set(tagsByCategory?.map((tag) => tag.categoryName)),
  ];
  return (
    <div style={styles.container}>
      <div style={styles.categoriesBox}>
        {categories.map((category) => {
          return (
            <div key={category}>
              <Typography sx={{ fontWeight: "700" }} key={category}>
                {category}
              </Typography>
              {Array.from(
                new Map(
                  tagsByCategory?.map((item) => [item.name, item])
                ).values()
              )?.map(
                (tag) =>
                  tag.categoryName === category && (
                    <FormControlLabel
                      key={tag.tagId}
                      control={
                        <Checkbox
                          key={tag.name}
                          sx={{
                            "&.Mui-checked": {
                              color: "black",
                            },
                          }}
                          onChange={(_, checked) => {
                            if (checked)
                              setChecked((prev) =>
                                prev.concat({
                                  tagId: tag.tagId,
                                  categoryId: tag.categoryId,
                                })
                              );
                            else
                              setChecked((prev) =>
                                prev.filter(({ tagId }) => tagId !== tag.tagId)
                              );
                          }}
                        />
                      }
                      label={tag.name}
                    />
                  )
              )}
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
};

export default FilterBox;
