import Link from "next/link"
import { PiBowlFoodDuotone } from "react-icons/pi";

export default function NavBarComponent() {
  return (
    <div className="container w-full mx-auto sm:flex sm:items-center sm:justify-between w-">
      <Link href='/'>
        <header className="flex flex-row items-center mt-5">
          <PiBowlFoodDuotone size={40} />
          <p className="text-2xl font-semibold">Local Eats</p>
        </header>
      </Link>
    </div>
  );
}
