"use client";
import FoodListComponent from "./FoodListComponent";
import RestaurantListComponent from "./RestaurantListComponent";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { IFoodInfo, ILocationInfo, IRestaurantInfo } from "../../interfaces/types";

export default function FoodToRestaurantComponent({
  foodList,
  locationInfo,
  setFoodList
}: {
  foodList: Array<IFoodInfo>;
  locationInfo: ILocationInfo;
  setFoodList: Dispatch<SetStateAction<Array<IFoodInfo>>>;

}) {
  const [selectedFood, setSelectedFood] = useState("");
  const [restaurantMap, setRestaurantMap] = useState(new Map<string, Map<string, IRestaurantInfo>>());

  useEffect(() => {
    setSelectedFood("");
  }, [locationInfo]);

  return (
      <div className="flex flex-row grow-0 w-full mt-20 gap-x-32 justify-center">
        <FoodListComponent
          foodList={foodList}
          setSelectedFood={setSelectedFood}
          selectedFood={selectedFood}
          setFoodList={setFoodList}
        />
        <RestaurantListComponent
          selectedFood={selectedFood}
          locationInfo={locationInfo}
          restaurantMap={restaurantMap}
          setRestaurantMap={setRestaurantMap}
        />
      </div>
  );
}
