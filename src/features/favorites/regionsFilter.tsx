import {
  TextField,
  Chip,
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { grayColor, indigoColor } from "../../shared/styles/colors";

interface RegionsFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortOption: "name";
  onSortChange: (value: "name") => void;
  availableTags?: string[];
}

export const RegionsFilter = ({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  sortOption,
  onSortChange,
  availableTags = ["горы", "море", "история", "курорт", "природа"],
}: RegionsFilterProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tagsAnchorEl, setTagsAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const tagsOpen = Boolean(tagsAnchorEl);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTagsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTagsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTagsAnchorEl(null);
  };

  return (
    <Box sx={{ mb: 4, width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={isMobile ? "Поиск..." : "Найти регион..."}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          sx: {
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.24)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:"#816980ff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#816980ff",
              borderWidth: "1px",
            },
          },
        }}
        sx={{
          mb: 3,
          fontSize: isMobile ? 16 : 24,
          "& .MuiInputBase-input": {
            fontSize: isMobile ? 16 : 20,
            height: isMobile ? "1.5em" : "auto",
            padding: isMobile ? "12px 14px" : "16px 14px",
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 2 : 5,
          width: "100%",
          zIndex: 10,
        }}
      >
        {!isMobile ? (
          <>
            <Typography
              color="white"
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: "bold",
                fontSize: isMobile ? 16 : 24,
                minWidth: isMobile ? "auto" : "80px",
              }}
            >
              Теги:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ flex: 1 }}
            >
              {availableTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  color={selectedTags.includes(tag) ? "primary" : "default"}
                  onClick={() => onTagToggle(tag)}
                  sx={{
                    mb: 1,
                    fontSize: isMobile ? 12 : 14,
                    height: isMobile ? 32 : 40,
                  }}
                />
              ))}
            </Stack>
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <IconButton
              onClick={handleTagsClick}
              sx={{
                color: "white",
                p: 1,
                borderRadius: "20px",
                backgroundColor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <TuneIcon fontSize={isMobile ? "medium" : "large"} />
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  fontSize: isMobile ? 14 : 20,
                  ml: 1,
                }}
              >
                Теги
              </Typography>
            </IconButton>

            <Menu
              anchorEl={tagsAnchorEl}
              open={tagsOpen}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "12px",
                  minWidth: "200px",
                  maxHeight: "60vh",
                  overflow: "auto",
                  backgroundColor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  p: 2,
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Выберите теги:
              </Typography>
              {availableTags.map((tag) => (
                <MenuItem
                  key={tag}
                  onClick={() => {
                    onTagToggle(tag);
                  }}
                  sx={{
                    backgroundColor: selectedTags.includes(tag)
                      ? "rgba(144, 36, 150, 0.1)"
                      : "transparent",
                  }}
                >
                  <ListItemText
                    primary={tag}
                    primaryTypographyProps={{
                      fontWeight: selectedTags.includes(tag)
                        ? "bold"
                        : "normal",
                      color: selectedTags.includes(tag)
                        ? indigoColor
                        : grayColor,
                    }}
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: isMobile ? 0 : "auto",
            gap: 1,
            zIndex: 10,
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "flex-end" : "flex-start",
          }}
        >
          <IconButton
            onClick={handleSortClick}
            sx={{
              color: "white",
              p: isMobile ? 1 : "auto",
              borderRadius: "20px",
              backgroundColor: isMobile
                ? "rgba(255,255,255,0.2)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontSize: isMobile ? 14 : 20,
                display: isMobile ? "none" : "block",
              }}
            >
              Сортировать
            </Typography>
            {open ? (
              <ExpandLessIcon fontSize={isMobile ? "medium" : "large"} />
            ) : (
              <ExpandMoreIcon fontSize={isMobile ? "medium" : "large"} />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "sort-button",
            }}
            PaperProps={{
              sx: {
                borderRadius: "12px",
                minWidth: "200px",
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                onSortChange("name");
                handleClose();
              }}
              sx={{
                backgroundColor:
                  sortOption === "name"
                    ? "rgba(58, 36, 150, 0.1)"
                    : "transparent",
              }}
            >
              <ListItemText
                primary="По названию"
                primaryTypographyProps={{
                  fontWeight: sortOption === "name" ? "bold" : "normal",
                  color:
                    sortOption === "name" ? indigoColor : grayColor,
                }}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemText primary="По новизне" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemText primary="По популярности" />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
