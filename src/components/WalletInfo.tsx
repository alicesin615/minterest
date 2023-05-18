import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName
} from 'wagmi';
import { Card } from '.';

export function WalletInfo() {
    const { address, connector, isConnected } = useAccount();
    const { data: ensAvatar } = useEnsAvatar({ address });
    const { data: ensName } = useEnsName({ address });

    return <Card title="Wallet"></Card>;
}
