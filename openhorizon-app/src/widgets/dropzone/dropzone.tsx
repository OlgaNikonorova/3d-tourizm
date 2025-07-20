import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export interface DropzoneProps {
  title: string;
  type: "image" | "video";
  onFilesChange: (files: File[]) => void;
}

const Dropzone = (props: DropzoneProps) => {
  const { onFilesChange, type, title } = props;

  const [uploadedFiles, setUploadedFiles] = useState<
    { file: File; preview: string }[]
  >([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      try {
        const files = [
          ...uploadedFiles,
          ...acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
          })),
        ];
        setUploadedFiles(files);
        onFilesChange(files.map((f) => f.file));
      } catch (error) {
        setUploadError("Ошибка при загрузке файлов. Попробуйте снова.");
      }
    },
    [onFilesChange, uploadedFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    onFilesChange(newFiles.map((f) => f.file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      [type === "image" ? "image/*" : "video/*"]:
        type === "image"
          ? [".jpeg", ".jpg", ".png", ".webp"]
          : [".mp4", ".mov", ".avi", ".webm"],
    },
    maxFiles: 10,
    multiple: true,
  });

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  return (
    <Box mb={3}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "1px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.400",
          borderRadius: "30px",
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          mb: 2,
          backgroundColor: isDragActive ? "action.hover" : "background.paper",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Перетащите файлы сюда...</Typography>
        ) : (
          <Typography>
            Перетащите сюда {type === "image" ? "фотогорафии" : "видео"} или
            кликните для выбора
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          (Поддерживаются{" "}
          {type === "image" ? "JPG, PNG, WEBP" : "MP4, MOV, AVI, WEBM"}.
          Максимум 10 файлов)
        </Typography>
      </Box>

      {uploadError && (
        <Typography
          color="error"
          variant="caption"
          display="block"
          gutterBottom
        >
          {uploadError}
        </Typography>
      )}

      {uploadedFiles.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {uploadedFiles.map((item, index) => (
            <Box
              key={index}
              sx={{ position: "relative", width: 100, height: 100 }}
            >
              {type === "image" ? (
                <img
                  src={item.preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                  onLoad={() => {
                    URL.revokeObjectURL(item.preview);
                  }}
                />
              ) : (
                <video
                  src={item.preview}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                  onLoad={() => {
                    URL.revokeObjectURL(item.preview);
                  }}
                />
              )}

              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  width: "20px",
                  height: "20px",
                  right: 0,
                  color: "error.main",
                  backgroundColor: "background.paper",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "white",
                  },
                }}
                onClick={() => removeFile(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dropzone;
