import { LoginForm } from "@/features/auth/components/loginform";
import { requireUnAuth } from "@/lib/auth.utils";
const page = async () => {
  await requireUnAuth();
  return <LoginForm />;
};

export default page;
