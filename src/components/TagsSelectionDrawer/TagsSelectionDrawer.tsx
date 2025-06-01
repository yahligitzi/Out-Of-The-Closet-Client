import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import SelectButton from "../SelectButton";
import { useMemo } from "react";
import { ItemTag } from "../../types/tag.type";
import styles from "./TagsSelectionDrawer.style";
import ColorTagSelection from "./ColorTagSelection";

type TagsSelectionDrawerProps = {
  selectedCategoryId: string;
  handleGoBack: () => void;
  tags: ItemTag[];
  checked: { tagId: string; categoryId: string }[];
  setChecked: React.Dispatch<
    React.SetStateAction<{ tagId: string; categoryId: string }[]>
  >;
  title: string;
};

const TagsSelectionDrawer = ({
  selectedCategoryId,
  handleGoBack,
  tags,
  setChecked,
  checked,
  title,
}: TagsSelectionDrawerProps) => {
  const areAllSelected = useMemo(() => {
    const checkedAmount = checked.filter(
      ({ categoryId }) => categoryId === selectedCategoryId
    ).length;

    return checkedAmount === tags.length;
  }, [checked, selectedCategoryId]);

  const handleSelectAll = () => {
    const newTagsToSelect = tags.filter(
      (currTag) => !checked.find(({ tagId }) => currTag.tagId === tagId)
    );

    setChecked((prev) => prev.concat(newTagsToSelect));
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.upperBarContainer}>
        <div style={styles.puller} />
        <Box sx={styles.actionLine}>
          <IconButton onClick={handleGoBack}>
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          <SelectButton
            areAllSelected={areAllSelected}
            clearFunc={() =>
              setChecked((prev) =>
                prev.filter(
                  ({ categoryId }) => categoryId !== selectedCategoryId
                )
              )
            }
            selectAllFunc={handleSelectAll}
          />
        </Box>
        <Divider sx={styles.divider} />
      </Box>
      <Box sx={styles.contentRoot}>
        {title === "Color" ? (
          <ColorTagSelection
            checked={checked}
            setChecked={setChecked}
            tags={tags}
          />
        ) : (
          <List sx={styles.list}>
            {tags.map((tag) => (
              <FormControlLabel
                key={tag.tagId}
                control={
                  <Checkbox
                    key={tag.name}
                    checked={!!checked.find(({ tagId }) => tagId === tag.tagId)}
                    sx={styles.checkBox}
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
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default TagsSelectionDrawer;
