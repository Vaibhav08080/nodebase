
import { AuthLayout } from "@/features/auth/components/auth-layout";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <AuthLayout>
      {children}
    </AuthLayout>

    </div>
  );
};
export default Layout;
