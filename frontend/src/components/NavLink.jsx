import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavLink({ to, text, setIsMenuOpen }) {
  return (
    <Link
      to={to}
      className="group relative flex items-center"
      onClick={() => setIsMenuOpen(false)}
    >
      <span className="hover:text-[#ffffff] transition-all duration-300 hover:bg-black p-2 rounded-md font-[500] ">
        {text}
      </span>
      <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#000000] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setIsMenuOpen: PropTypes.func,
};

export default NavLink;
