import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@admin/routes/routes';
import { route } from '@admin/routes/type';
import styles from '../SideNav.module.css';

export const Logo = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.logo} onClick={() => navigate(route(RouteNames.home).path)}>
            <LogoSvg />
        </div>
    );
};

const LogoSvg = () => {
    return (
        <svg width="250" height="50" viewBox="0 0 250 50" xmlns="http://www.w3.org/2000/svg">
            <rect width="250" height="50" fill="white" />
            <g transform="translate(0, 10)">
                <circle cx="15" cy="15" r="12" fill="#0A6C8E" />
                <path d="M15 8 L17 13 L22 15 L17 17 L15 22 L13 17 L8 15 L13 13 Z" fill="white" />
            </g>
            <text
                x="40"
                y="30"
                fontFamily="'Segoe UI', 'Helvetica Neue', sans-serif"
                fontSize="18"
                fill="#0A6C8E"
            >
                Yoshida Portfolio
            </text>
        </svg>
    );
};
