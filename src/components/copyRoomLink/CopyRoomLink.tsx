type CopyRoomLinkProps = {
    roomStatus: boolean
}

export const CopyRoomLink = ({ roomStatus }: CopyRoomLinkProps) => {

    if (roomStatus) {
        return <></>
    }

    return <>
        <h1 className="text-3xl font-bold text-center">Invite players to the room</h1>
        <p className="py-6 text-center">Send the link below to your team mates and soon they will start joining the room</p>
        <button className="btn btn-outline">Copy Room Link</button>
    </>
}