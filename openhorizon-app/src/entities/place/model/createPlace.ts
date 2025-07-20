import Panorama from "../../city/model/panorama";
import Photo from "./photo";
import Video from "./video";

export default interface CreatePlace {
  id: string;
  title: string;
  description: string;
  address: string;
  cityId: string;
  tagsId: string[];
  photos: Photo[];
  videos: Video[];
  panorama?: Panorama;
}
