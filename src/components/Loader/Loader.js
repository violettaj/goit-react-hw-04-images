import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = props => {
  let { isLoading } = props;
  if (isLoading) {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
  }
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
