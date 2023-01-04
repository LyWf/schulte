import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { unzipResult } from '$lib/utils/schulte';

export const load = (({ url }) => {
  const value = url.searchParams.get('value');

  if (value) {
    return {
      result: unzipResult(value),
    };
  }

  throw redirect(302, '/start');
}) satisfies PageLoad;
