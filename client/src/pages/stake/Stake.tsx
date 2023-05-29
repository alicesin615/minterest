import { ethers } from 'ethers';
import { useContractRead } from 'wagmi';
import { Card } from '@components/Card';
import { PrimaryText, SecondaryText } from '@components/Text';
import * as priceFeed from '@constants/PriceFeed.json';
import { PriceFeedAddress } from 'src/types';
import { Button } from '@components/Buttons';
import { PriceFeedAddresses } from '@constants/PriceFeedAddresses';
import { SigFigFormatter } from '@utils/number-utils';
import { Img } from '@components/Img';

const AvailableCollateral = ({
    priceFeedAddress
}: {
    priceFeedAddress: PriceFeedAddress;
}) => {
    const { data: latestPriceData } = useContractRead({
        address: priceFeed?.address,
        abi: priceFeed?.abi,
        functionName: 'getPrice',
        args: [Object.values(priceFeedAddress)?.[0]]
    });

    const symbol = Object.keys(priceFeedAddress)?.[0]?.split('_')?.[0];

    const formattedLatestPrice =
        Boolean(latestPriceData) &&
        ethers.formatUnits(latestPriceData?.[0] as ethers.BigNumberish, 8);

    // const retrievedTime = new Date(Number(latestPriceData?.[1]));

    return (
        <PrimaryText className="grid grid-cols-[repeat(3,1fr)] items-center py-4">
            <div className="flex gap-4 items-center font-medium">
                <Img
                    src={`/assets/images/coins/${symbol}.png`}
                    width={32}
                    height={32}
                />
                {symbol}
            </div>
            <span>{SigFigFormatter(formattedLatestPrice || 0)} USD</span>
            <Button label="Stake" className="w-fit ml-auto" />
        </PrimaryText>
    );
};
export function Stake() {
    return (
        <div className="flex flex-col gap-8">
            {/* <div className="flex gap-8">
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
            </div> */}
            <Card title="Available Collaterals" className="flex-1">
                <div className="flex flex-col pt-4">
                    {PriceFeedAddresses?.map((priceFeedAddress, i) => (
                        <AvailableCollateral
                            key={i}
                            priceFeedAddress={priceFeedAddress}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
}
