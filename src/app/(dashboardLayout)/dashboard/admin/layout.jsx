import { roleValidator } from "@/lib/api/session";

const OwnerLayout = async ({ children }) => {
    await roleValidator("admin")

    return children
};

export default OwnerLayout;