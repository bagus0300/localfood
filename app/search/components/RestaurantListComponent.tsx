"use client";
import RestaurantBoxComponent from "./RestaurantBoxComponent";
import { ILocationInfo, IRestaurantInfo } from "../../interfaces/types";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

export default function RestaurantListComponent({
  selectedFood,
  locationInfo,
  restaurantMap,
  setRestaurantMap,
}: {
  selectedFood: string;
  locationInfo: ILocationInfo;
  restaurantMap: Map<string, Map<string, IRestaurantInfo>>;
  setRestaurantMap: Dispatch<
    SetStateAction<Map<string, Map<string, IRestaurantInfo>>>
  >;
}) {
  const [restaurants, setRestaurants] = useState<IRestaurantInfo[]>([]);

  const compareRestaurants = (a: IRestaurantInfo, b: IRestaurantInfo) => {
    if (a.rating == undefined || b.rating == undefined) {
      return 0;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  };

  const getRestaurants = async () => {
    const response = await fetch("/api/restaurantSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: selectedFood,
        lat: locationInfo.coordinates.lat,
        lng: locationInfo.coordinates.lng,
        radius: 25000,
      }),
    });

    const data = await response.json();

    setRestaurants(
      data != null
        ? (data.result.results as IRestaurantInfo[]).sort(compareRestaurants)
        : []
    );
    const sortedRestaurants = (data.result.results as IRestaurantInfo[]).sort(
      compareRestaurants
    );
    setRestaurantMap(
      restaurantMap.set(
        selectedFood,
        new Map(
          sortedRestaurants.map((obj) => [
            obj.place_id != undefined ? obj.place_id : "",
            obj,
          ])
        )
      )
    );
    console.log(restaurantMap);

    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
  };

  useEffect(() => {
    if (selectedFood != "") {
      const r = restaurantMap.get(selectedFood);
      if (r != undefined) {
        setRestaurants([...r.values()]);
        console.log(restaurantMap);
      } else {
        getRestaurants().catch(console.error);
      }
    }
    if (selectedFood == "") {
      setRestaurants([]);
    }
  }, [selectedFood]);

  return (
    <div className="flex flex-col grow-0 justify-start gap-y-6 w-1/3">
      <div className="text-center w-full">
        <p className="font-sans text-2xl font-bold">Where to Eat</p>
      </div>
      {restaurants.map((restaurant: IRestaurantInfo) =>
        restaurant.rating != undefined &&
        restaurant.rating > 4 &&
        restaurant.user_ratings_total != undefined &&
        restaurant.user_ratings_total > 50 ? (
          <RestaurantBoxComponent
            key={restaurant.place_id}
            restaurantInfo={restaurant}
            restaurantMap={restaurantMap}
            setRestaurantProps={(url: string, photo: string): void => {
              if (photo != null) {
                restaurant.image = photo;
              }
              if (url != null) {
                restaurant.url = url;
              }
              setRestaurantMap(
                restaurantMap.set(
                  selectedFood,
                  new Map(
                    restaurants.map((obj) => [
                      obj.place_id != undefined ? obj.place_id : "",
                      obj,
                    ])
                  )
                )
              );
            }}
            selectedFood={selectedFood}
          />
        ) : null
      )}
    </div>
  );
}
