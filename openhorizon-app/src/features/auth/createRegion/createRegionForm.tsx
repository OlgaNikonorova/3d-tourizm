import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetRegionsQuery } from "../../../entities/region/api/regionApi";

export interface RegionData {
  id: string;
  name: string;
}

interface CreateRegionFormProps {
  onSubmit: (data: RegionData) => void;
  isLoading?: boolean;
}

const CreateRegionForm = ({ onSubmit, isLoading }: CreateRegionFormProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { data: existingRegions = [], isFetching: isRegionsLoading } =
    useGetRegionsQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Название региона не может быть пустым");
      return;
    }

    const isDuplicate = existingRegions.some(
      (region) => region.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError("Регион с таким названием уже существует");
      return;
    }

    const newRegion: RegionData = {
      id: uuidv4(),
      name: name.trim(),
    };

    onSubmit(newRegion);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "800px" }}>
        <Typography
          variant="h4"
          color="#3A2496"
          mb={4}
          fontWeight="bold"
          textAlign="center"
        >
          Создание нового региона
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Typography
            variant="subtitle1"
            color="#3A2496"
            mb={1}
            fontWeight="bold"
          >
            Название региона
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            placeholder="Введите название региона"
          />

          {error && (
            <Typography color="#FF3D57" variant="body2" mb={2} sx={{ pl: 1 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !name.trim() || isRegionsLoading}
              sx={{
                backgroundColor: "#3A2496",
                color: "white",
                borderRadius: "30px",
                px: 6,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#4B36B1",
                },
                "&:disabled": {
                  backgroundColor: "#E8E2F7",
                  color: "#A79CC5",
                },
              }}
            >
              {isLoading ? "Создание..." : "Создать регион"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateRegionForm;
