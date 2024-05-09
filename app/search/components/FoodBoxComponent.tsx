"use client";
import { IFoodInfo } from "../../interfaces/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

export default function FoodBoxComponent({
  foodInfo,
  setSelectedFood,
  selectedFood,
  setFoodList,
  index,
  foodList,
}: {
  foodInfo: IFoodInfo;
  setSelectedFood: Dispatch<SetStateAction<string>>;
  selectedFood: string;
  setFoodList: Dispatch<SetStateAction<Array<IFoodInfo>>>;
  index: number;
  foodList: Array<IFoodInfo>;
}) {
  // const [style, setStyle] = useState("");

  // if (selectedFood === foodInfo.name) {
  //   setStyle("border-2 border-black scale-105");
  // } else {
  //   setStyle("border");
  // }

  const [foodImage, setFoodImage] = useState("/black_image.jpg");

  const getFoodImage = async () => {
    const response = await fetch("/api/imageSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName: foodInfo.name }),
    });

    const data = await response.json();

    setFoodImage(data.result.items[0].link);
    setFoodList(
      foodList.map((f, i) => {
        if (i == index) {
          f.image = foodImage;
        }
        return f;
      })
    );
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
  };

  useEffect(() => {
    if (foodInfo.image == undefined) {
      console.log("getting food image")
      getFoodImage().catch(console.error);
    }
  }, [])

  return (
    <div
      onClick={() => setSelectedFood(foodInfo.name)}
      className={`flex flex-row gap-4 justify-start ${selectedFood === foodInfo.name
          ? "border-2 border-black scale-105"
          : "border"
        } rounded-lg p-4 hover:scale-105 hover:border-2`}
    >
      <img src={foodImage} alt="me" width="128" height="128" />
      <div className="flex flex-col">
        <p className="text-lg font-medium">{foodInfo.name}</p>
        <p>{foodInfo.description}</p>
      </div>
    </div>
  );
}
