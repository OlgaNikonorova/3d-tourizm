import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  keyframes,
} from "@mui/material";
import CreateRegionForm from "../../features/createRegion/createRegionForm";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCreateCityMutation } from "../../entities/city/api/cityApi";
import CreateCity from "../../entities/city/model/createCity";
import { useCreatePlaceMutation } from "../../entities/place/api/placeApi";
import CreatePlace from "../../entities/place/model/createPlace";
import {
  useCreateRegionMutation,
  useGetRegionsQuery,
} from "../../entities/region/api/regionApi";
import CreateCityForm from "../../features/createCity/createCityForm";
import { CreatePlaceForm } from "../../features/createPlace/createPlaceForm";
import { showErrorToast, showSuccessToast } from "../../shared/ui/toast";
import { animations } from "../../shared/styles/animations";
import { darkIndigo, indigoColor } from "../../shared/styles/colors";
import SuccessModal from "./ui/successModal";

interface CreateCityPageProps {
  editMode?: boolean;
  initialCity?: any;
  initialPlaces?: any[];
  onSubmitCity?: (data: any) => void;
}

const CreateCityPage = ({
  editMode = false,
  initialCity,
  initialPlaces = [],
  onSubmitCity,
}: CreateCityPageProps) => {
  const [createRegion] = useCreateRegionMutation();
  const [createCity] = useCreateCityMutation();
  const [createPlace] = useCreatePlaceMutation();
  const { data: regions = [], refetch: refetchRegions } = useGetRegionsQuery();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successAction, setSuccessAction] = useState<'add' | 'edit'>('add');

  const handleOpenSuccessModal = (action: 'add' | 'edit') => {
    setSuccessAction(action);
    setSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const [currentCityId, setCurrentCityId] = useState(uuidv4());
  const [places, setPlaces] = useState<CreatePlace[]>([]);

  const { data: regionsList = [], isLoading } = useGetRegionsQuery();

  const handleSubmitRegion = async (data: any) => {
    try {
      await createRegion(data).unwrap();
      showSuccessToast("Новый регион успешно добавлен!");
      refetchRegions();
    } catch (err) {
      console.error(err);
      showErrorToast(
        "Не удалось создать регион. Возможно, регион с таким названием уже существует."
      );
    }
  };

  const handleSubmitCity = async (cityData: CreateCity) => {
    try {
      if (editMode && onSubmitCity) {
        onSubmitCity(cityData);
        showSuccessToast("Город успешно обновлен!");
        handleOpenSuccessModal("edit");
        return;
      }

      const createdCity = await createCity(cityData).unwrap();

      for (const place of places) {
        const placeData: CreatePlace = {
          ...place,
          cityId: createdCity.id,
        };
        await createPlace(placeData);
      }

      showSuccessToast(
        "Новый город и достопримечательности успешно добавлены!"
      );
      handleOpenSuccessModal("add");
    } catch (err) {
      console.error(err);
      showErrorToast(
        editMode
          ? "Не удалось обновить город."
          : "Не удалось создать город и/или достопримечательности."
      );
    }
  };

  const refreshForm = () => {
    setCurrentCityId(uuidv4());
    setPlaces([]);
    showSuccessToast("Форма очищена. Можно добавить новый город.");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('/backgrounds/purple-iridescent-texture-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 8,
        animation: `${animations.fadeIn} 0.5s ease-out`,
      }}
    >
      <Typography
        sx={{
          fontSize: "42px",
          color: "white",
          mb: 4,
          fontWeight: 700,
          letterSpacing: "2px",
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          animation: `${animations.float} 3s ease-in-out infinite`,
        }}
      >
        OpenHorizon
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          mb: 4,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          animation: `${animations.fadeIn} 0.7s ease-out`,
        }}
      >
        <CreateRegionForm onSubmit={handleSubmitRegion} isLoading={isLoading} />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          mb: 4,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          animation: `${animations.fadeIn} 0.7s ease-out`,
        }}
      >
        <CreateCityForm
          onSubmit={handleSubmitCity}
          isLoading={isLoading}
          cityId={currentCityId}
          regions={regions}
          initialData={initialCity}
        >
          <CreatePlaceForm
            isLoading={isLoading}
            cityId={currentCityId}
            setPlaces={setPlaces}
            places={places}
          />
        </CreateCityForm>
      </Box>

      <SuccessModal 
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        actionType={successAction}
      />
    </Box>
  );
};

export default CreateCityPage;