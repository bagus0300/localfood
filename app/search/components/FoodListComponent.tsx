"use client";
import FoodBoxComponent from "./FoodBoxComponent";
import { IFoodInfo } from "../../interfaces/types";
import { Dispatch, SetStateAction } from "react";

export default function FoodListComponent({
  foodList,
  setSelectedFood,
  selectedFood,
  setFoodList
}: {
  foodList: Array<IFoodInfo>;
  setSelectedFood: Dispatch<SetStateAction<string>>;
  selectedFood: string;
  setFoodList: Dispatch<SetStateAction<Array<IFoodInfo>>>;

}) {
  return (
    <div className="flex flex-col grow-0 justify-start gap-y-6 w-1/3">
      <div className="text-center w-full">
        <p className="font-sans text-2xl font-bold">Foods</p>
      </div>
      {foodList.map((food: IFoodInfo, i) => (
        <FoodBoxComponent key={food.name} index={i} setFoodList={setFoodList} foodList={foodList} foodInfo={food} setSelectedFood={setSelectedFood} selectedFood={selectedFood} />
      ))}
    </div>
  );
}
