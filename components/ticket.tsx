"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import QRCode from "react-qr-code";

export default function Ticket({ user_id }: { user_id: string }) {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <CardContainer className="inter-var w-11/12">
            <CardBody className="bg-[#306c84] relative gr</CardContainer>oup/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#306c84] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded text-white space-y-4">
                <CardItem
                    translateZ="50"
                    className="px-2 md:px-6 pt-6 flex flex-row justify-between w-full"
                >
                    <Image
                        src={'/assets/th-text.png'}
                        alt={'terrahacks-logo'}
                        width={3000}
                        height={400}
                        className="w-[60%] max-w-full h-auto object-contain"
                    />
                    <div className="flex flex-row space-x-6">
                        <div className={'flex flex-col'}>
                            <span className={'text-sm text-gray-200 text-right'}>DATE</span>
                            <span className={''}>Aug 2</span>
                        </div>
                        <div className={'flex flex-col'}>
                            <span className={'text-sm text-gray-200 text-right'}>TIME</span>
                            <span className={''}>{currentTime}</span>
                        </div>
                    </div>
                </CardItem>
                <CardItem className="w-full">
                    <Image
                        src="/assets/tmu.jpg"
                        height="1000"
                        width="1000"
                        className="h-32 w-full object-cover object-[0%90%] group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <CardItem translateZ={50} className={'px-3 md:px-6'}>
                    <div className={'text-sm text-gray-200'}>EVENT</div>
                    <div>TerraHacks - Hackathon</div>
                </CardItem>
                <CardItem translateZ={50} className={'px-3 md:px-6 flex flex-row w-full justify-between text-sm md:text-sm'}>
                    <div>
                        <div className={'text-gray-200'}>LOCATION</div>
                        <div>Toronto Metropolitan<br />University</div>
                    </div>
                    <div>
                        <div className={'text-gray-200'}>CHECK-IN</div>
                        <div>18:00</div>
                    </div>
                    <div>
                        <div className={'text-gray-200'}>ROOM</div>
                        <div>DCC 103</div>
                    </div>
                </CardItem>
                <CardItem translateZ={100} className={'mx-auto pb-6'}>
                    <div className={'bg-white p-2 rounded'}>
                        <QRCode value={`https://admin.terrahacks.ca/dashboard/log/${user_id}`} fgColor={'#306c84'} />
                    </div>
                </CardItem>
            </CardBody>
        </CardContainer>
    );
}
