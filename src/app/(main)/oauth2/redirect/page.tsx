"use client";

import { LoadingBackdrop } from "@/components/auth";
import { getUserProfileDetails } from "@/services/userDetailsService";
import { setJwtToken, setUserInfo } from "@/store/features/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const OAuth2Redirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      dispatch(setJwtToken(token));

      getUserProfileDetails(token).then((userData) => {
        dispatch(setUserInfo(userData.data));
        router.replace("/dashboard");
      });
    }
  }, [dispatch, router]);

  return <LoadingBackdrop open message="Signing you in with Google..." />;
};

export default OAuth2Redirect;
