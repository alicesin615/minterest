import { useLocation } from 'react-router-dom';
import { Card } from '../../components';

export function Stake() {
    const location = useLocation();
    const { state } = location;
    const { address, balance } = state || {};

    return <Card />;
}
