import { Dna } from 'react-loader-spinner';
import { Load } from './Loader.styled';

export const Loader = () => {
  return (
    <Load>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Load>
  );
};
