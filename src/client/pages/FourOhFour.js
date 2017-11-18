import React from 'react';

const FourOhFour = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <div>
      <h1>
        <div>Oh No!</div>
        The page you are looking for doesn't seem to exist!
      </h1>
    </div>
  );
};

export default {
  component: FourOhFour
};
