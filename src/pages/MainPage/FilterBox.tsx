import { Checkbox, FormControlLabel, Typography } from "@mui/material";

interface Props {
  TagsByCategory: {
    categoryName: string | null;
    name: string;
    tagId: string;
    categoryId: string;
  }[] | undefined
}

const FilterBox = (props: Props) => {
  const categories = [...new Set(props.TagsByCategory?.map(tag => tag.categoryName))];
  return (
    <div
      style={{
        border: "1px solid lightGray",
        borderRadius: 6,
        maxHeight: "100%",
        marginTop: "1vh",
        width: "14vw"
      }}
    >
      <div style={{
        width: "15vw",
        display: "flex",
        flexDirection: "column",
        marginLeft: "1.5vh",
        marginTop: "1vh",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}>
        {categories.map(category => {
          return (<>
            <Typography sx={{ fontWeight: "700" }}>{category}</Typography>
            {props.TagsByCategory?.map(tag =>
              tag.categoryName === category && <FormControlLabel control={<Checkbox sx={{
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
