import { Box, Button, Typography } from "@mui/material";
import PlaceModal from "./createPlaceModal";
import { useState } from "react";
import CreatePlace from "../../entities/place/model/createPlace";

export interface CreatePlaceFormProps {
  setPlaces: (places: CreatePlace[]) => void;
  places: CreatePlace[];
  isLoading?: boolean;
  cityId: string;
}

export const CreatePlaceForm = (props: CreatePlaceFormProps) => {
  const { setPlaces, places, isLoading, cityId } = props;

  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [editPlaceIndex, setEditPlaceIndex] = useState<number | null>(null);

  const handleSavePlace = (place: CreatePlace) => {
    if (editPlaceIndex === null) {
      setPlaces([...places, place]);
    } else {
      const updatedPlaces = [...places];
      updatedPlaces[editPlaceIndex] = place;
      setPlaces(updatedPlaces);
    }
    setShowPlaceModal(false);
  };

  const handleDeletePlace = (index: number) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  return (
    <Box mb={4} sx={{ overflowX: "hidden" }}>
      <Typography variant="h6" color="#3A2496" mb={2} fontWeight="bold">
        Достопримечательности
      </Typography>

      {places.map((place, index) => (
        <Box
          key={place.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #E8E2F7",
            borderRadius: "30px",
            p: 2,
            mb: 2,
            boxShadow: "0px 4px 12px rgba(58, 36, 150, 0.08)",
          }}
        >
          <Box>
            <Typography variant="subtitle1" color="#3A2496" fontWeight="bold">
              {place.title}
            </Typography>
            <Typography variant="body2" color="#3A2496">
              Адрес: {place.address}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={() => {
                setEditPlaceIndex(index);
                setShowPlaceModal(true);
              }}
              sx={{
                color: "#3A2496",
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: "bold",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "#F0EBFA",
                },
              }}
            >
              Редактировать
            </Button>

            <Button
              onClick={() => handleDeletePlace(index)}
              sx={{
                color: "#FF3D57",
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: "bold",
                borderRadius: "30px",
                "&:hover": {
                  backgroundColor: "#FFEBEE",
                },
              }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          onClick={() => {
            setEditPlaceIndex(null);
            setShowPlaceModal(true);
          }}
          variant="contained"
          sx={{
            backgroundColor: "#3A2496",
            color: "white",
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#4B36B1",
            },
          }}
        >
          Добавить достопримечательность
        </Button>
      </Box>

      <PlaceModal
        open={showPlaceModal}
        onClose={() => setShowPlaceModal(false)}
        place={editPlaceIndex !== null ? places[editPlaceIndex] : undefined}
        onSave={handleSavePlace}
        isEdit={editPlaceIndex !== null}
        cityId={cityId}
      />
    </Box>
  );
};
