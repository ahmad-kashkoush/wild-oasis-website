import Link from "next/link";

function Navigation() {
    return (
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/cabins">Cabins Page</Link>
            </li>
            <li>
                <Link href="/account">Account Page</Link>
            </li>
            <li>
                <Link href="/about">about Page</Link>
            </li>
        </ul>
    );
}
export default Navigation;