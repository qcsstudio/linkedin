'use server'
import { cookies } from 'next/headers';

export async function logOut() {
    const cookiesStore =  cookies();
    await cookiesStore.delete('access_token');
}