"use client";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/navigation';
import SearchComponent from "./components/SearchComponent";
import FoodToRestaurantComponent from "./components/FoodToRestaurantComponent";
import { IFoodInfo, ILocationInfo } from "../interfaces/types";

export default function SearchPage() {
    const [locationInfo, setLocationInfo] = useState<ILocationInfo>();
    const [foodList, setFoodList] = useState<Array<IFoodInfo>>([]);
    const [searching, setSearching] = useState(false);

    return (
        <main className="flex min-h-screen shrink-0 grow-0 flex-col items-center p-20 	">
            <div className="shrink-0">
                <SearchComponent
                    setFoodList={setFoodList}
                    setLocationInfo={setLocationInfo}
                    setSearching={setSearching}
                />
            </div>

            <div className="flex flex-col grow-0 h-full items-center w-full shrink-0 mt-20">
                {searching ? (
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div>
                ) : null}
                {locationInfo != undefined ? (
                    <FoodToRestaurantComponent
                        foodList={foodList}
                        locationInfo={locationInfo}
                        setFoodList={setFoodList}
                    />
                ) : null}
            </div>
        </main>
    );
}
