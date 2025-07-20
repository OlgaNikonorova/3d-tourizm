import { CircularProgress, Typography, Box, Chip } from "@mui/material";
import { useGetFileByIdQuery } from "../../features/files/api/filesApi";

interface MediaItemProps {
  id: string;
  title: string;
  type: "photo" | "video";
  placeTitle?: string;
  tags?: Array<{ id: string; name: string }>;
}

const MediaItem = ({ id, title, type, placeTitle, tags }: MediaItemProps) => {
  const { data: fileData, isLoading, isError } = useGetFileByIdQuery(id);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Box>Ошибка загрузки медиа</Box>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {type === "photo" ? (
        <img
          alt={title}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      ) : (
        <video
          controls
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      )}

      <Box sx={{ p: 2 }}>
        {placeTitle && (
          <Typography variant="subtitle1" gutterBottom>
            {placeTitle}
          </Typography>
        )}
        <Typography variant="body2" gutterBottom>
          {title}
        </Typography>
        {tags && tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                sx={{ backgroundColor: "#3A2496", color: "white" }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MediaItem;
