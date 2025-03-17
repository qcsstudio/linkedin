'use server'
import { cookies } from 'next/headers';

export async function logOut() {

    const cookiesStore = await cookies();
    cookiesStore.delete('access_token');

}