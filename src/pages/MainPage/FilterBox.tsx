import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import tagsService from "../../services/tags.service";

const FilterBox = () => {
  const { user } = useUser();

  const { data: TagsByCategory } = useQuery({
    queryKey: ["tags", user?.id],
    queryFn: () => tagsService.getTagByCategory(user?.id ?? ""),
  });

  const categories = [...new Set(TagsByCategory?.map(tag => tag.categoryName))];
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
            {TagsByCategory?.map(tag =>
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
