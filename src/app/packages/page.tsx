import PackagesView from '@/sections/PackagesView/view';
import { getMySubscriptionAction } from 'src/actions/packages';

export default async function PackagesPage() {
  const result = await getMySubscriptionAction();

  return <PackagesView subscription={result.success ? result.data : null} />;
}
