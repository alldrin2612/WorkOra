import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Link, Tooltip } from '@mui/material';
import Logo from '../../assets/images/logo.png';
// project imports
import Avatar from '../extended/Avatar';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const CardSecondaryAction = ({ title, link, icon }) => {
  const theme = useTheme();

  return (
    <Tooltip title={title || 'Reference'} placement="left">
      <ButtonBase disableRipple>
        {!icon && (
          <Avatar component={Link} href={link} target="_blank" alt="MUI Logo" size="badge" color="primary" outline>
            <div style={{ width: "500px", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Logo />
            </div>
          </Avatar>
        )}
        {icon && (
          <Avatar component={Link} href={link} target="_blank" size="badge" color="primary" outline>
            {icon}
          </Avatar>
        )}
      </ButtonBase>
    </Tooltip>
  );
};

CardSecondaryAction.propTypes = {
  icon: PropTypes.node,
  link: PropTypes.string,
  title: PropTypes.string
};

export default CardSecondaryAction;
