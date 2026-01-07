import Link from "next/link";
const MENU = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
];
const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 px-12 ">
            <Link href="/">
                <span className="text-2xl font-bold">SpiderSense</span>
            </Link>
            <div>
                {MENU.map((item) => (
                    <Link key={item.name} href={item.link}>
                        <span className="mx-4 text-white font-bold inline-block hover:scale-110 transition-transform">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Navbar;
