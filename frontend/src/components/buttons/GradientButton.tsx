import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
    background: 'linear-gradient(45deg, #6610f2 30%, #9d4edd 90%)',
    border: 0,
    borderRadius: '10px',
    color: 'white',
    padding: '8px 24px',
    fontWeight: 700,
    letterSpacing: '1px',
    boxShadow: '0 3px 5px 2px rgba(102, 16, 242, .3)',
    backgroundSize: '200% auto',
    transition: '0.5s',
    '&:hover': {
        backgroundPosition: 'right center',
        boxShadow: '0 5px 10px 3px rgba(102, 16, 242, .4)',
        transform: 'translateY(-2px)'
    },
    '&:active': {
        transform: 'translateY(0)'
    }
});

const GradientButton: React.FC<{ 
    onClick: () => void;
    children: string;
    icon?: string; 
}> = ({ onClick, children, icon }) => (
    <StyledButton 
        variant="contained"
        onClick={onClick}
        startIcon={icon ? <i className={`bi ${icon}`} /> : undefined}
    >
        {children}
    </StyledButton>
);

export default GradientButton;