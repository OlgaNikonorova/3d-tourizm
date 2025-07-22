import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  keyframes,
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreatePlace from "../../entities/place/model/createPlace";
import Photo from "../../entities/place/model/photo";
import Video from "../../entities/place/model/video";
import {
  useCreateTagsMutation,
  useGetTagsQuery,
} from "../../entities/tags/api/tagsApi";
import Tag from "../../entities/tags/models/tags";
import Dropzone from "../../widgets/dropzone/dropzone";
import { useUploadFileMutation } from "../files/api/filesApi";
import { showErrorToast, showSuccessToast } from "../../shared/ui/toast";
import { animations } from "../../shared/styles/animations";
import { indigoColor } from "../../shared/styles/colors";

interface PlaceModalProps {
  open: boolean;
  onClose: () => void;
  place: CreatePlace | undefined;
  onSave: (place: CreatePlace) => void;
  isEdit: boolean;
  cityId: string;
}

const PlaceModal = ({
  open,
  onClose,
  place,
  onSave,
  isEdit,
  cityId,
}: PlaceModalProps) => {
  const [uploadFile] = useUploadFileMutation();
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { data: tags = [], refetch: refetchTags } = useGetTagsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createTag] = useCreateTagsMutation();
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (place && tags.length > 0) {
      const selected = tags.filter((tag) => place.tagsId.includes(tag.id));
      setSelectedTags(selected);
    }
  }, [place, tags]);

  const handleAddTag = async () => {
    if (tagInput.trim() && !tags.some((tag) => tag.name === tagInput.trim())) {
      try {
        const newTag = { id: uuidv4(), name: tagInput.trim() };
        await createTag(newTag).unwrap();
        refetchTags();
        setSelectedTags((prev) => [...prev, newTag]);
        setTagInput("");
        showSuccessToast(`Тег "${tagInput.trim()}" успешно добавлен`);
      } catch (error) {
        console.error("Ошибка при создании тега:", error);
        showErrorToast("Не удалось создать тег");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: Tag) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagToRemove.id));
    showSuccessToast(`Тег "${tagToRemove.name}" удален`);
  };

  const [newPlace, setNewPlace] = useState<CreatePlace>(
    place || {
      id: uuidv4(),
      title: "",
      description: "",
      address: "",
      cityId: cityId,
      tagsId: [],
      photos: [],
      videos: [],
      panorama: {
        id: uuidv4(),
        name: "",
        description: "",
        coordinates: [0, 0],
        direction: [0, 0],
        span: [0, 0],
      },
    }
  );

  useEffect(() => {
    if (open) {
      setNewPlace(
        place || {
          id: uuidv4(),
          title: "",
          description: "",
          address: "",
          cityId: cityId,
          tagsId: [],
          photos: [],
          videos: [],
          panorama: {
            id: uuidv4(),
            name: "",
            description: "",
            coordinates: [0, 0],
            direction: [0, 0],
            span: [0, 0],
          },
        }
      );
      setPhotoFiles([]);
      setVideoFiles([]);
      setSelectedTags([]);
    }
  }, [open, place, cityId]);

  const handleAddPanorama = () => {
    setNewPlace({
      ...newPlace,
      panorama: {
        name: "",
        description: "",
        id: uuidv4(),
        direction: [0, 0],
        span: [0, 0],
        coordinates: [0, 0],
      },
    });
    showSuccessToast("Панорама добавлена");
  };

  const handleRemovePanorama = () => {
    setNewPlace({ ...newPlace, panorama: undefined });
    showSuccessToast("Панорама удалена");
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);

      const photos = await Promise.all(
        photoFiles.map(async (file) => {
          try {
            const formData = new FormData();
            formData.append("inputFile", file);
            const response = await uploadFile({
              id: uuidv4(),
              name: file.name,
              type: "image",
              extension: file.name.split(".").pop() || "",
              formData,
            }).unwrap();
            return { photoId: response.id } as Photo;
          } catch (error) {
            console.error("Ошибка при загрузке фото:", error);
            showErrorToast(`Не удалось загрузить фото ${file.name}`);
            throw error;
          }
        })
      );

      const videos = await Promise.all(
        videoFiles.map(async (file) => {
          try {
            const formData = new FormData();
            formData.append("inputFile", file);
            const response = await uploadFile({
              id: uuidv4(),
              name: file.name,
              type: "video",
              extension: file.name.split(".").pop() || "",
              formData,
            }).unwrap();
            return { videoId: response.id } as Video;
          } catch (error) {
            console.error("Ошибка при загрузке видео:", error);
            showErrorToast(`Не удалось загрузить видео ${file.name}`);
            throw error;
          }
        })
      );

      const updatedPlace = {
        ...newPlace,
        tagsId: selectedTags.map((tag) => tag.id),
        photos: [...newPlace.photos, ...photos],
        videos: [...newPlace.videos, ...videos],
      };

      onSave(updatedPlace);
      showSuccessToast(
        isEdit ? "Место успешно обновлено" : "Место успешно создано"
      );
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении места:", error);
      showErrorToast(
        isEdit ? "Не удалось обновить место" : "Не удалось создать место"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          animation: `${animations.fadeIn} 0.5s ease-out`,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: "1.5rem",
          textAlign: "center",
          py: 3,
          textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          backgroundColor: "rgba(58, 36, 150, 0.3)",
        }}
      >
        {isEdit ? "Редактирование места" : "Добавление нового места"}
      </DialogTitle>

      <DialogContent dividers sx={{ overflowY: "auto", py: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Название"
            fullWidth
            value={newPlace.title}
            onChange={(e) =>
              setNewPlace({ ...newPlace, title: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              "& .MuiInputLabel-root": {
                color: "#2d2166ff",
              },
            }}
          />

          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={3}
            value={newPlace.description}
            onChange={(e) =>
              setNewPlace({ ...newPlace, description: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              "& .MuiInputLabel-root": {
                color: "#2d2166ff",
              },
            }}
          />

          <TextField
            label="Адрес"
            fullWidth
            value={newPlace.address}
            onChange={(e) =>
              setNewPlace({ ...newPlace, address: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              "& .MuiInputLabel-root": {
                color: "#2d2166ff",
              },
            }}
          />

          <Box>
            <Typography
              variant="subtitle1"
              color="white"
              mb={1}
              fontWeight="bold"
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Теги
            </Typography>
            <Autocomplete
              multiple
              freeSolo
              options={tags}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              value={selectedTags}
              onChange={(_, newValue) => {
                setSelectedTags(
                  newValue.filter((v) => typeof v !== "string") as Tag[]
                );
                const lastValue = newValue[newValue.length - 1];
                if (typeof lastValue === "string") {
                  setTagInput(lastValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Выберите теги"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      handleAddTag();
                      e.preventDefault();
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#2d2166ff",
                    },
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.name}
                    onDelete={() => handleRemoveTag(option)}
                    sx={{
                      backgroundColor: "rgba(58, 36, 150, 0.5)",
                      color: "#2d2166ff",
                      mr: 1,
                      mb: 1,
                      borderRadius: "30px",
                      "& .MuiChip-deleteIcon": {
                        color: "rgba(255,255,255,0.7)",
                      },
                    }}
                  />
                ))
              }
            />

            {tagInput.trim() &&
              !tags.some((t) => t.name === tagInput.trim()) && (
                <Button
                  onClick={handleAddTag}
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    color: "white",
                    borderColor: "white",
                    borderRadius: "30px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white",
                    },
                  }}
                >
                  Добавить тег "{tagInput.trim()}"
                </Button>
              )}
          </Box>

          {newPlace.panorama === undefined ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <Button
                onClick={handleAddPanorama}
                variant="contained"
                sx={{
                  backgroundColor: indigoColor,
                  color: "#2d2166ff",
                  borderRadius: "30px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  animation: `${animations.pulse} 2s ease-in-out infinite`,
                  "&:hover": {
                    backgroundColor: "#4B36B1",
                  },
                }}
              >
                Добавить панораму
              </Button>
            </Box>
          ) : (
            <>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  color="white"
                  mb={1}
                  fontWeight="bold"
                  sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  Яндекс панорама
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "30px",
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      onClick={handleRemovePanorama}
                      sx={{
                        color: "#FF3D57",
                        textTransform: "none",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      Удалить панораму
                    </Button>
                  </Box>
                </Box>

                <TextField
                  label="Название"
                  fullWidth
                  value={newPlace.panorama?.name || ""}
                  onChange={(e) => {
                    setNewPlace({
                      ...newPlace,
                      panorama: {
                        ...newPlace.panorama!,
                        name: e.target.value,
                      },
                    });
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#2d2166ff",
                    },
                  }}
                />

                <TextField
                  label="Описание"
                  fullWidth
                  multiline
                  rows={2}
                  value={newPlace.panorama?.description || ""}
                  onChange={(e) => {
                    setNewPlace({
                      ...newPlace,
                      panorama: {
                        ...newPlace.panorama!,
                        description: e.target.value,
                      },
                    });
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#2d2166ff",
                    },
                  }}
                />

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid>
                    <Typography
                      variant="subtitle2"
                      color="white"
                      mb={1}
                      fontWeight="bold"
                      sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      Координаты [x, y]
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid>
                        <TextField
                          type="number"
                          label="X"
                          fullWidth
                          value={newPlace.panorama?.coordinates[0] || ""}
                          onChange={(e) => {
                            const newCoords = newPlace.panorama!.coordinates;
                            newCoords[0] = parseFloat(e.target.value) ?? 0;
                            setNewPlace({
                              ...newPlace,
                              panorama: {
                                ...newPlace.panorama!,
                                coordinates: newCoords,
                              },
                            });
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#2d2166ff",
                            },
                          }}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          type="number"
                          label="Y"
                          fullWidth
                          value={newPlace.panorama?.coordinates[1] || ""}
                          onChange={(e) => {
                            const newCoords = newPlace.panorama!.coordinates;
                            newCoords[1] = parseFloat(e.target.value) ?? 0;
                            setNewPlace({
                              ...newPlace,
                              panorama: {
                                ...newPlace.panorama!,
                                coordinates: newCoords,
                              },
                            });
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#2d2166ff",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid>
                    <Typography
                      variant="subtitle2"
                      color="white"
                      mb={1}
                      fontWeight="bold"
                      sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      Направление [x, y]
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid>
                        <TextField
                          type="number"
                          label="X"
                          fullWidth
                          value={newPlace.panorama?.direction[0] || ""}
                          onChange={(e) => {
                            const newDirection = newPlace.panorama!.direction;
                            newDirection[0] = parseFloat(e.target.value) ?? 0;
                            setNewPlace({
                              ...newPlace,
                              panorama: {
                                ...newPlace.panorama!,
                                direction: newDirection,
                              },
                            });
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#2d2166ff",
                            },
                          }}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          type="number"
                          label="Y"
                          fullWidth
                          value={newPlace.panorama?.direction[1] || ""}
                          onChange={(e) => {
                            const newDirection = newPlace.panorama!.direction;
                            newDirection[1] = parseFloat(e.target.value) ?? 0;
                            setNewPlace({
                              ...newPlace,
                              panorama: {
                                ...newPlace.panorama!,
                                direction: newDirection,
                              },
                            });
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#2d2166ff",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid>
                    <Typography
                      variant="subtitle2"
                      color="white"
                      mb={1}
                      fontWeight="bold"
                      sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      Масштаб [ширина, высота]
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid>
                        <TextField
                          type="number"
                          label="Ширина"
                          fullWidth
                          value={newPlace.panorama?.span[0] || ""}
                          onChange={(e) => {
                            const newSpan = newPlace.panorama!.span;
                            newSpan[0] = parseFloat(e.target.value) ?? 0;
                            setNewPlace({
                              ...newPlace,
                              panorama: {
                                ...newPlace.panorama!,
                                span: newSpan,
                              },
                            });
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#2d2166ff",
                            },
                          }}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          type="number"
                          label="Высота"
                          fullWidth
                          value={newPlace.panorama?.span[1] || ""}
                          onChange={(e) => {
                            const newSpan = newPlace.panorama!.span;
                            newSpan[1] = parseFloat(e.target.value) ?? 0;
                            setNewPlace({
                              ...newPlace,
                              panorama: {
                                ...newPlace.panorama!,
                                span: newSpan,
                              },
                            });
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#2d2166ff",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          <Dropzone
            title="Фотографии"
            type="image"
            onFilesChange={(files) => setPhotoFiles(files)}
          />

          <Dropzone
            title="Видео"
            type="video"
            onFilesChange={(files) => setVideoFiles(files)}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "#ffffffff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "30px",
            px: 3,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!newPlace.title.trim() || isUploading}
          sx={{
            backgroundColor: indigoColor,
            color: "#ffffffff",
            borderRadius: "30px",
            px: 4,
            py: 1,
            fontWeight: 600,
            animation: `${animations.pulse} 2s ease-in-out infinite`,
            "&:hover": {
              backgroundColor: "#4B36B1",
            },
            "&:disabled": {
              backgroundColor: "rgba(58, 36, 150, 0.3)",
              color: "rgba(255,255,255,0.5)",
              animation: "none",
            },
          }}
        >
          {isUploading ? "Сохранение..." : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceModal;
