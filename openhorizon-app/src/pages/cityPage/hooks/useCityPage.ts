import { useParams } from "react-router-dom";
import {
  useGetCityByIdQuery,
} from "../../../entities/city/api/cityApi";
import { useGetRegionByIdQuery } from "../../../entities/region/api/regionApi";
import { useGetPlacesQuery } from "../../../entities/place/api/placeApi";

export const useCityPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: city,
    error: cityError,
    refetch: refetchCity,
  } = useGetCityByIdQuery(id!, { refetchOnMountOrArgChange: true });

  const {
    data: region,
    error: regionError,
    refetch: refetchRegion,
  } = useGetRegionByIdQuery(city?.regionId ?? "", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: places = [],
    error: placesError,
    refetch: refetchPlaces,
  } = useGetPlacesQuery({cityId: city?.id, regionId: city?.regionId, }, { refetchOnMountOrArgChange: true });

  return { city, cityError, refetchCity, region, regionError, refetchRegion, places, placesError, refetchPlaces };
};
