import PropTypes from 'prop-types'
import Text from '../Text/Text';
import './RadioButton.scss'

export default function RadioButton(props){
    const { changed, id, isSelected, label } = props;
    return (
      <label className="raadio-btn">
        <input
          id={id}
          onChange={changed}
          type="radio"
          checked={isSelected}
        />
        <span>{label}</span>
      </label>
    );
  };

RadioButton.propTypes = {
    changed: PropTypes.func,
    id: PropTypes.number,
    isSelected: PropTypes.bool,
    label: PropTypes.string
}