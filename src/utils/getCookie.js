"use server"
import { cookies } from "next/headers";

export const getCookie = async(key) => {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(`${key}`);
    return cookieValue;
}

