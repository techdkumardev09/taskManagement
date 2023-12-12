import React from 'react'
import Heading from '../Heading';
import { allImages } from '../../utils/constants';

const NodataFound = () => {
  return (
    <div className="mx-auto">
      <img
        className="mt-5 w-40"
        src={allImages.taskNotFound}
        alt="src"
      />
      <Heading
        title="No task found"
        className="text-center font-mono text-lg mt-6"
      />
    </div>
  );
}

export default NodataFound;