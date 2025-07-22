import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetCityByIdQuery,
  useUpdateCityMutation,
} from "../../entities/city/api/cityApi";
import { useGetPlacesQuery } from "../../entities/place/api/placeApi";
import CreateCityPage from "../createCityPage/createCityPage";

const EditCityPage = () => {
  const { id: cityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: cityFromApi, isLoading: isCityLoading } = useGetCityByIdQuery(
    cityId!,
    {
      skip: !cityId,
    }
  );

  const initialCity = location.state?.city || cityFromApi;

  const { data: places = [], isLoading: isPlacesLoading } = useGetPlacesQuery(
    { cityId: cityId! },
    { skip: !cityId }
  );

  const [updateCity] = useUpdateCityMutation();

  const handleSubmitCity = async (cityData: any) => {
    try {
      await updateCity({
        id: cityId!,
        data: cityData,
      }).unwrap();
      navigate(`/city/${cityId}`);
    } catch (err) {
      console.error("Ошибка при обновлении города:", err);
    }
  };

  if (!initialCity || isCityLoading || isPlacesLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <CreateCityPage
      editMode={true}
      initialCity={initialCity}
      initialPlaces={places}
      onSubmitCity={handleSubmitCity}
    />
  );
};

export default EditCityPage;
