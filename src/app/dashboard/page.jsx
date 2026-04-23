import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {

    const headerList = await headers(); // ✅ MUST

    const session = await auth.api.getSession({
        headers: headerList
    });

    console.log(session);

    return (
        <div>
            this is our dashboard
        </div>
    );
};

export default DashboardPage;