"use client"
import { signOut, useSession } from "@/lib/auth-client";
import { Link, Button } from "@heroui/react";

const Navbar = () => {

    const {data, isPending} = useSession();
    if(isPending){
        return <div>loading....</div>
    }

    console.log(data);
    const user = data?.user;
    
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <div className="flex h-16 items-center justify-between px-6">

                {/* Left - Logo / Brand */}
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <Link href="/">MyApp</Link>
                </div>

                {/* Middle - Links */}
                <ul className="hidden md:flex items-center gap-6 text-sm">
                    <li>
                        <Link href="/" className="hover:text-primary transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="hover:text-primary transition">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                {/* Right - Actions */}
                <div className="flex items-center gap-3">
                    
                    
                </div>

                <div>
                    {user ? 
                    <> <p>welcome, {user.name}!</p>
                    <Button
                    onClick={() => signOut()}
                    >Sign out</Button>
                    </> 
                    : <>
                    <Link href="/auth/singin"><Button variant="bordered">sing In</Button></Link>
                    </>}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;