import { useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { RegionsFilter } from "../../features/favorites/regionsFilter";
import FavoritesCitiesGrid from "./widgets/favoritesGrid";
import { animations } from "../../shared/styles/animations";


const FavoritesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<"name">("name");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/backgrounds/vivid-blurred-colorful-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        animation: `${animations.fadeIn} 0.5s ease-out`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        pb: 4,
      }}
    >
      <Box
        component="img"
        src="/VioletCircle2.png"
        sx={{
          position: "absolute",
          top: 300,
          left: 0,
          width: 804,
          height: 1124,
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/WhiteCircle3.png"
        sx={{
          position: "absolute",
          top: 800,
          right: 0,
          width: 605,
          height: 1229,
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/WhiteCircleSquare.png"
        sx={{
          position: "absolute",
          top: 500,
          right: 200,
          width: 275,
          height: 295,
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/WhiteCircleSquare.png"
        sx={{
          position: "absolute",
          top: 1200,
          left: 200,
          width: 275,
          height: 295,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          pt: "170px",
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            width: "100%",
          }}
        >
          <Box sx={{ minWidth: "10%" }} />
          <Typography
            sx={{
              fontWeight: 700,
              color: "white",
              flexGrow: 1,
              textAlign: "center",
              fontSize: "42px",
              textShadow: "2px 2px 8px rgba(132, 43, 126, 0.5)",
              animation: `${animations.float} 3s ease-in-out infinite`,
              letterSpacing: "2px",
            }}
          >
            ИЗБРАННОЕ
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            p: 4,
            mb: 9,
            animation: `${animations.fadeIn} 0.7s ease-out`,
          }}
        >
          <RegionsFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTags={selectedTags}
            onTagToggle={(tag) =>
              setSelectedTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((t) => t !== tag)
                  : [...prev, tag]
              )
            }
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </Box>
        <FavoritesCitiesGrid
          searchQuery={searchQuery}
          selectedTags={selectedTags}
          sortOption={sortOption}
        />
      </Box>
    </Box>
  );
};

export default FavoritesPage;
