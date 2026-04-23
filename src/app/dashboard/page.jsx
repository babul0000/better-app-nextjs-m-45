import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {

    const headerList = await headers(); // ✅ MUST

    const session = await auth.api.getSession({
        headers: headerList
        
    });

    console.log(session);

    const user = session?.user;
    if(!user) {
        redirect('/auth/singing')
        return <div>please singing to access the dashboard</div>
    }

    return (
        <div>
            this is our dashboard
        </div>
    );
};

export default DashboardPage;