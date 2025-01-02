import React from 'react';

const ReviewPage = ({ data }) => {
  return (
    <div>
      <h2>Review Project Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ReviewPage;
