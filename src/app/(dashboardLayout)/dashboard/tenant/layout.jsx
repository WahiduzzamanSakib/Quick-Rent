import { roleValidator } from "@/lib/api/session";


const TenantLayout = async ({ children }) => {

   await roleValidator("tenant")

    return children
};

export default TenantLayout;