import { CreateRoom } from "@/components/createRoom/CreateRoom";
import { DonationInfoModal } from "@/components/donationInfoModal/DontationInfoModal";

export default function Home() {
  return (
    <>
      <DonationInfoModal />
      <CreateRoom />
    </>
  );
}
