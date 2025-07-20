export default interface Panorama {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  direction: [number, number];
  span: [number, number];
}
