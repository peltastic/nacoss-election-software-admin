import { RootState } from "@/lib/store";
import { errorColor } from "@/utils/constants";
import { getCookie } from "@/utils/storage";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useProtectRoute = () => {
  const router = useRouter();
  const [disableExpiration, setDisableExpiration] = useState<boolean>(false);
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.status
  );
  useEffect(() => {
    const token  = getCookie("token")
    if (!token && !disableExpiration) {
      notifications.show({
        message: "Session Expired, Please Log In",
        color: errorColor,
      });
      router.push("/");
    }
  }, []);
  return {
    disableExpiration: () => {
      setDisableExpiration(true);
    },
  };
};
