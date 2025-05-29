import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { customer } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!customer) {
        router.push('/login');
      }
    }, [customer, router]);

    if (!customer) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth; 