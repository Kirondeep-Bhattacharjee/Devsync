import PropTypes from 'prop-types';

const ShowItems = ({ title, items }) => {
  return (
    <div>
      <h2>{title}</h2>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

ShowItems.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default ShowItems;
