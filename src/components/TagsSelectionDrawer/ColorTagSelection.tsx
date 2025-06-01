import { Box, Typography } from "@mui/material";
import styles from "./TagsSelectionDrawer.style";
import { ItemTag } from "../../types/tag.type";
import React from "react";

type ColorTagSelectionProps = {
  tags: ItemTag[];
  checked: { tagId: string; categoryId: string }[];
  setChecked: React.Dispatch<
    React.SetStateAction<{ tagId: string; categoryId: string }[]>
  >;
};

const ColorTagSelection = ({
  checked,
  setChecked,
  tags,
}: ColorTagSelectionProps) => {
  return (
    <Box sx={styles.colorTagListWrapper}>
      {tags.map((tag) => {
        const isTagSelected = !!checked.find(
          ({ tagId }) => tagId === tag.tagId
        );

        return (
          <div style={styles.colorBoxWithTitle as React.CSSProperties}>
            <Box
              onClick={() => {
                if (isTagSelected)
                  setChecked((prev) =>
                    prev.filter(({ tagId }) => tagId !== tag.tagId)
                  );
                else
                  setChecked((prev) =>
                    prev.concat({
                      tagId: tag.tagId,
                      categoryId: tag.categoryId,
                    })
                  );
              }}
              key={tag.name}
              sx={{
                ...styles.colorBox,
                ...(isTagSelected ? styles.selectedColorTag : {}),
                backgroundColor: tag.name,
              }}
            />
            <Typography>{tag.name}</Typography>
          </div>
        );
      })}
    </Box>
  );
};

export default ColorTagSelection;
