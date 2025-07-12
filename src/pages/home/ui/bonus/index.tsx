import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { AppRoute } from '@/const';

export const Bonus: React.FC = () => {
    return (
    <div className={styles.Bonus}>
        <div className={styles.Bonus__container}>
            <Link
                className={styles.Bonus__link}
                to={AppRoute.Bonus}
            >
            <img className={styles.Bonus__image} src={'/images/bonus-banner.webp'} />
            </Link>
        </div>
    </div>
    );
};
