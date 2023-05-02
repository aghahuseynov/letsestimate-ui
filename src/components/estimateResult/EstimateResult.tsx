import { RoomEstimation } from '@/common/types';
import { PieChart } from 'react-minimal-pie-chart';



type EstimateResultProps = {
    roomEstimations?: RoomEstimation
}

function getRandomColor(): string {
    const colors: string[] = [];

    for (let i = 0; i < 20; i++) {
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);
    }

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export const EstimateResult = ({ roomEstimations }: EstimateResultProps) => {


    if (!roomEstimations) {
        return <div></div>
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


        const charData = Object.keys(estimationCounts).map((key: any) => {
            return {
                title: key,
                value: Number(estimationCounts[key]),
                color: getRandomColor()
            };
        });

        console.log(charData);

        return charData;
    }


    return <PieChart
        style={{ fontFamily: "Roboto", fontSize: "10px" }} labelStyle={{ fill: '#fff' }}
        label={({ dataEntry }) => dataEntry.title} startAngle={-90} animate={true}
        labelPosition={50 + 20}
        data={getEstimationsData()}
    />

}