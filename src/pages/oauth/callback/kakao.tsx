import * as Sentry from "@sentry/nextjs";

import React, { useEffect } from "react";

import { GetServerSideProps } from "next";
import Spinner from "@/components/UI/Spinner";
import { getUserAuth } from "@/service/apis/user";
import { useRouter } from "next/router";

interface IKakaoProps {
  accessToken: string;
  refreshToken: string;
  isNew: boolean;
}

const Kakao = ({ accessToken, refreshToken, isNew }: IKakaoProps) => {
  const router = useRouter();

  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; path=/;`;
    document.cookie = `refreshToken=${refreshToken}; path=/;`;

    if (isNew) {
      router.push("register");
    } else {
      router.push("/");
    }
  }, []);

  return <Spinner />;
};

export default Kakao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { code },
  } = context;

  try {
    const resp = await getUserAuth({
      token: code as string,
      type: "kakao",
    });

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      is_new: isNew,
    } = resp;

    return {
      props: {
        accessToken,
        refreshToken,
        isNew,
      },
    };
  } catch (e) {
    Sentry.setTag("api", "kakao-login");
    Sentry.captureException(e);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};
