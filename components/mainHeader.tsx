import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

function MainHeader() {
  return (
    <header>
      <Link href="/">
        Next Level Food.
        <Image src={logo.src} alt="Home Logo" width="50" height="50" />
      </Link>
      <nav>
        <Link href="/meals">Browse Meals</Link>
        <Link href="/community">Community</Link>
      </nav>
    </header>
  );
}

export default MainHeader;
