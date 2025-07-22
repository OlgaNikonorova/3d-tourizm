import Panorama from "../../city/model/panorama";
import Tag from "../../tags/models/tags";
import Photo from "./photo";
import Video from "./video";

export default interface Place {
  id: string;
  title: string;
  description: string;
  address: string;
  cityId: string;
  tags: Tag[];
  photos: Photo[];
  videos: Video[];
  panorama?: Panorama
}