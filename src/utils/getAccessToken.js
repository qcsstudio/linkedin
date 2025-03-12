"use server"

import { cookies } from "next/headers";

export const getAccessToken = async(tokenName) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(`${tokenName}`);
    return accessToken;
}

