import { roleValidator } from "@/lib/api/session";

const OwnerLayout = async ({ children }) => {
    await roleValidator("owner")
    
    return children
};

export default OwnerLayout;