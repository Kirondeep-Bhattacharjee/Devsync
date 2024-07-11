import PropTypes from 'prop-types';
import ShowItems from '../ShowItems/ShowItems';

const HomeComponent = ({ folders, files }) => {
  return (
    <div className='col-md-12 w-100'>
      <ShowItems title={"Created Folders"} items={folders} />
      <ShowItems title={"Created Files"} items={files} />
    </div>
  );
};

HomeComponent.propTypes = {
  folders: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
};

export default HomeComponent;
