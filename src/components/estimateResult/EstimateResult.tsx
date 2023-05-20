import { colors } from '@/common/colors';
import { RoomEstimation, RoomStatusType } from '@/common/types';
import { PieChart } from 'react-minimal-pie-chart';

type EstimateResultProps = {
    roomEstimations?: RoomEstimation;
    roomStatus: RoomStatusType

}

export const EstimateResult = ({ roomEstimations, roomStatus }: EstimateResultProps) => {

    if (roomStatus !== 'end') {
        return <></>
    }

    if (!roomEstimations) {
        return <></>
    }

    const getEstimationsData = () => {

        const estimationCounts = roomEstimations.attenders.reduce((p: any, c) => {
            const name = c.selectedEstimationSize;
            if (!p.hasOwnProperty(name)) {
                p[name] = 0;
            }
            p[name] += 1;
            return p;
        }, {});


        return Object.keys(estimationCounts).map((key: any, index) => {
            return {
                title: key,
                value: Number(estimationCounts[key]),
                color: colors[index]
            };
        });

    }


    return <div style={{ width: 550, height: 550 }}>
        <PieChart
            style={{ fontFamily: "Roboto", fontSize: "10px" }} labelStyle={{ fill: '#fff' }}
            label={({ dataEntry }) => dataEntry.title} startAngle={-90} animate={true}
            labelPosition={50 + 20}
            data={getEstimationsData()}
        />
    </div>

}