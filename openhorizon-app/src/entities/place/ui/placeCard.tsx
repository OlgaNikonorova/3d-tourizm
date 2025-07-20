import { useState, MouseEvent, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
// import { useGetPlaceByIdQuery } from "../api/placeApi";
import PlaceModel from "../model/place";
import { AnimatePresence, motion } from "framer-motion";

interface PlaceProps {
  place: PlaceModel;
  name: string;
  description: string;
}

const PlaceCard: React.FC<PlaceProps> = (props) => {
  // const { data: place, isLoading, error } = useGetPlaceByIdQuery(id);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const place = {
    id: "1",
    image: "/элиста1.webp",
    title: "Золотая обитель Будды Шакьямунди",
    description:
      "«Золотая обитель Будды Шакьямуни» — крупнейший буддийский храм Республики Калмыкия, а также крупнейший буддийский храм в Европе.",
  };

  const { name, description } = props;

  return (
    <motion.div
      className="relative bg-white shadow-lg rounded-xl overflow-hidden flex flex-col hover:cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/place/${place.id}`)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden group">
        <AnimatePresence initial={false}>
          <motion.img
            // key={currentImageIndex}
            src={place.image}
            alt={name}
            className="absolute w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
            
          />
        </AnimatePresence>

        {isHovered && (
          <>
            <div className="absolute inset-0 bg-transparent transition-all duration-300" />
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.div>
            </motion.div>
          </>
        )}
      </div>

      <div className="p-4 space-y-2 bg-transparent">
        <h3 className="text-xl text-[#3A2496] font-bold truncate">{name}</h3>
        <p className="text-sm text-[#3A2496] line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
