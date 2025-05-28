import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '10px',
    color: '#6610f2',
    padding: '6px 10px',
    opacity:0.85,
    fontWeight: 700,
    position: 'relative',
    transition: 'all 0.4s ease',
    '&:hover': {
        backgroundColor: 'rgba(102, 16, 242, 0.05)',
        color: '#4d0cb8'
    },
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: '0',
        height: '2px',
        backgroundColor: '#6610f2',
        transition: 'all 0.4s ease'
    },
    '&::before': {
        top: 0,
        left: 0,
    },
    '&::after': {
        bottom: 0,
        right: 0,
    },
    '&:hover::before, &:hover::after': {
        width: '100%'
    }
});

const BorderAnimationButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    icon?: string;
}> = ({ onClick, children, icon }) => (
    <StyledButton
        variant="outlined"
        onClick={onClick}
        startIcon={icon ? <i className={`bi ${icon}`} /> : undefined}
    >
        {children}
    </StyledButton>
);

export default BorderAnimationButton;