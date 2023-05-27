import { useLocation } from 'react-router-dom';
import { Card, PrimaryText } from '../../components';
import { SigFigFormatter } from '../../utils';

type StakeProps = {};
export function Stake() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <Card title="Currently Staked" className="flex-1">
                    <div className="flex gap-2 pt-2">
                        <div className="text-brand-primary font-medium text-2xl">
                            {SigFigFormatter(0)}
                        </div>
                    </div>
                </Card>
                <Card title="Available to Stake" className="flex-1">
                    <div className="flex gap-2 pt-2">
                        <div className="text-brand-primary font-medium text-2xl">
                            {SigFigFormatter(0)}
                        </div>
                    </div>
                </Card>
            </div>
            <Card title="Available Collaterals" className="flex-1"></Card>
        </div>
    );
}
