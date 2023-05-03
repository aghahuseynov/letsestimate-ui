

type StartEstimationType = {
    onClick: () => void
}

export const StartEstimation = ({ onClick }: StartEstimationType) => {
    return <>
        <p className="py-6 text-center">{`You are the moderator and are in control of the estimation session. Click on your avatar icon at the top right corner to hand over moderation to other players. Press "Start" when all players has joined the room.`}</p>
        <button onClick={onClick} className="btn">Start</button>
    </>
}