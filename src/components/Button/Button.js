import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ btnShow, handleMore }) => {
  return (
    <div className={css.load}>
      <button className={css.button} type="button" onClick={handleMore}>
        {btnShow}
      </button>
    </div>
  );
};

Button.propTypes = {
  btnShow: PropTypes.string.isRequired,
  handleMore: PropTypes.func.isRequired,
};
