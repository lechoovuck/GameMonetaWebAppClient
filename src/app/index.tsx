import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useUserStore } from '@/store/user';
import { Routing } from '@/pages';
import { withHocs } from './hocs';
import './styles/index.scss';

const queryClient = new QueryClient();

function App() {
  const { updateUserStateFromLocal } = useUserStore();

  useEffect(() => {
    updateUserStateFromLocal();
  }, [updateUserStateFromLocal]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routing />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default withHocs(App);
