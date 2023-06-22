/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from 'next/image'

export const DonationInfoModal = () => {
    const [donationInfoModal, setDonationInfoModal] = useState<string>('modal-open');

    const closeModal = () => {
        setDonationInfoModal('');
    }

    return <dialog id="donation_modal" className={`modal bg-transparent ${donationInfoModal}`}>
        <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Support</h3>
            <p className="py-4 items-center">
                Let`s Estimate is an open-source and free application that relies on financial support to remain accessible and ensure timely fixes for new features and bugs. The current monthly expense for maintaining the project is only 5 euros. By donating just 5 euros, you can help sustain the website and support its long-term development.
                Please feel free to click the `Buy me a coffee` button to make a donation. Your support is greatly appreciated!
                <br />
                <br />
                <a href="https://www.buymeacoffee.com/aghahuseynov" target="_blank">
                    <img style={{
                        height: '55px',
                        width: '200px'
                    }}
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                        alt="Buy Me A Coffee" />
                </a>
            </p>
            <div className="modal-action">
                <button onClick={closeModal} className="btn">Close</button>
            </div>
        </form>
    </dialog>
}