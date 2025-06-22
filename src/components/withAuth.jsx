import React from 'react';

// HOC to protect a component by checking for a valid user
const withAuth = (WrappedComponent) => {
  return function AuthWrapper(props) {
    if (!props.user) {
      return (
        <div className="p-4 bg-red-100 rounded">
          <p className="text-red-600 font-semibold">Access denied. Please log in.</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
