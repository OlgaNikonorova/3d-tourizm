import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CreateCity from "../../entities/city/model/createCity";
import Region from "../../entities/region/models/region";
import Dropzone from "../../widgets/dropzone/dropzone";
import { useUploadFileMutation } from "../files/api/filesApi";

interface CreateCityFormProps {
  onSubmit: (data: CreateCity) => void;
  isLoading?: boolean;
  cityId: string;
  regions: Region[];
  children?: React.ReactNode;
  initialData?: CreateCity;
}

const CreateCityForm = ({
  onSubmit,
  isLoading,
  cityId,
  regions,
  children,
  initialData,
}: CreateCityFormProps) => {
  const location = useLocation();
  const isEditing = location.pathname.includes("/edit-");

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [cityName, setCityName] = useState("");
  const [description, setDescription] = useState("");
  const [tour, setTour] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [existingPreviewId, setExistingPreviewId] = useState<
    string | undefined
  >(undefined);
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    if (initialData) {
      setCityName(initialData.name || "");
      setDescription(initialData.description || "");
      setTour(initialData.tour || "");
      setExistingPreviewId(initialData.previewId);

      if (initialData.regionId) {
        const region = regions.find((r) => r.id === initialData.regionId);
        if (region) setSelectedRegion(region);
      }
    }
  }, [initialData, regions]);

  const handleSubmit = async () => {
    if (!selectedRegion) {
      alert("Пожалуйста, выберите регион");
      return;
    }

    if (!cityName.trim()) {
      alert("Пожалуйста, введите название города");
      return;
    }

    try {
      let previewId = existingPreviewId;

      if (previewFile) {
        const formData = new FormData();
        formData.append("inputFile", previewFile);
        const uploadResponse = await uploadFile({
          id: uuidv4(),
          name: previewFile.name,
          type: "image",
          extension: previewFile.name.split(".").pop() || "",
          formData,
        }).unwrap();
        previewId = uploadResponse.id;
      }

      if (!previewId && !isEditing) {
        alert("Пожалуйста, загрузите превью города");
        return;
      }

      const cityData: CreateCity = {
        id: cityId,
        regionId: selectedRegion.id,
        name: cityName.trim(),
        description: description.trim(),
        tour: tour.trim(),
        previewId: previewId || "",
      };

      onSubmit(cityData);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Произошла ошибка при сохранении");
    }
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
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "#3A2496",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          {isEditing ? "Редактировать город" : "Создать город"}
        </Typography>

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            color="#3A2496"
            mb={1}
            fontWeight="bold"
          >
            Регион
          </Typography>
          <Autocomplete
            options={regions}
            getOptionLabel={(option) => option.name}
            value={selectedRegion}
            onChange={(_, newValue) => setSelectedRegion(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Выберите регион"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <KeyboardArrowDown />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            disabled={isEditing}
          />
        </Box>

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            color="#3A2496"
            mb={1}
            fontWeight="bold"
          >
            Город
          </Typography>
          <TextField
            fullWidth
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            placeholder="Введите название города"
          />
        </Box>

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            color="#3A2496"
            mb={1}
            fontWeight="bold"
          >
            Описание
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            placeholder="Введите описание города"
          />
        </Box>

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            color="#3A2496"
            mb={1}
            fontWeight="bold"
          >
            3D-тур
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={tour}
            onChange={(e) => setTour(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            placeholder="Введите описание 3D-тура"
          />
        </Box>

        <Box mb={4}>
          <Typography
            variant="subtitle1"
            color="#3A2496"
            mb={1}
            fontWeight="bold"
          >
            Превью города{" "}
            {isEditing && "(Оставьте пустым, чтобы сохранить текущее)"}
          </Typography>
          <Dropzone
            title=""
            type="image"
            onFilesChange={(files) => setPreviewFile(files[0] || null)}
          />
        </Box>

        {children}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading || !selectedRegion || !cityName.trim()}
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
            {isLoading ? "Сохранение..." : isEditing ? "Обновить" : "Создать"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCityForm;
