import {TECollapse, TERipple, TETabs, TETabsContent, TETabsItem, TETabsPane} from "tw-elements-react";
import {useEffect, useState} from "react";
import React from "react";

export default function Navbar({struct}) {
    const [basicActive, setBasicActive] = useState("tab1");
    const [show1, setShow1] = useState([false]);
    const [show2, setShow2] = useState([false]);
    const [Struct1, setStruct1] = useState([]);
    const [Struct2, setStruct2] = useState([]);
    const [triggered1, setTriggered1] = useState(false);
    const [triggered2, setTriggered2] = useState(false);
    const [Struct1Updated, setStruct1Updated] = useState(0);
    const [Struct2Updated, setStruct2Updated] = useState(0);


    function toggleShow1(index) {
        show1[index] = !show1[index];
        setShow1(show1);
        setTriggered1(!triggered1)
    }

    function toggleShow2(index) {
        show2[index] = !show2[index];
        setShow2(show1);
        setTriggered2(!triggered2)
    }

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    useEffect(() => {

        if (JSON.parse(struct.BASE.TYPE) == 4) {
            // Struct1.pop(struct)
            setStruct1([struct, ...Struct1]);
            show1.push(false);
            console.log(Struct1)
            setStruct1Updated(Struct1Updated + 1);
        } else if (JSON.parse(struct.BASE.TYPE) == 5) {
            // Struct2.pop(struct)
            // setStruct2(Struct2);
            setStruct2([struct, ...Struct2]);
            show2.push(false);
            console.log(Struct2)
            setStruct2Updated(Struct2Updated + 1);
        }
        return () => {
        };
    }, [struct]);

    useEffect(() => {
    }, [triggered1, triggered2, Struct1Updated, Struct2Updated]);

    return (
        <div className="mb-3">
            <TETabs className="flex justify-center">
                <TETabsItem
                    onClick={() => handleBasicClick("tab1")}
                    active={basicActive === "tab1"}
                >
                    Landing
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleBasicClick("tab2")}
                    active={basicActive === "tab2"}
                >
                    Struct 1
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleBasicClick("tab3")}
                    active={basicActive === "tab3"}
                >
                    Struct 2
                </TETabsItem>
            </TETabs>

            <TETabsContent className="flex justify-center">
                <TETabsPane show={basicActive === "tab1"}>
                    <div className="w-80">
                        Hello, my name is Eddy, and this is a two server buffer handler example which uses websocket and UDP connections. Enjoy:
                        <ul style={{listStyle: 'inside'}}>
                            <li className="my-3">
                                "SEND BUFFER 1/2":
                                use this button for sending a single buffer message
                            </li>
                            <li className="my-3">
                                "SEND RANDOM BUFFER": use this button for sending a random buffer
                                message, selected between Buffer 1, Buffer 2 and a wrong type of Buffer
                            </li>
                            <li className="my-3">
                                "CLOSE CONNECTION": use this button for closing the websocket connection.
                                It will auto-reconnect after a few seconds
                            </li>
                            <li className="my-3">
                                "Connection Status": this space informs the user about websocket
                                connection.
                            </li>
                            <li className="my-3">
                                "Number of erroneus packets": this label informs the user about wrong packets sent by the
                                client and being ignored in 'Struct 1' and 'Struct 2' tabs
                            </li>
                        </ul>
                    </div>
                </TETabsPane>
                <TETabsPane show={basicActive === "tab2"}>
                    <div className="flex justify-center text-red-500 font-bold">Buffer 1</div>
                    {Struct1.slice(0, 10).map((item, index) => { // Mostra solo i primi 10 elementi
                        const key = Object.keys(item)[0];
                        const values = item[key];
                        return (
                            <div key={index} className="my-4">
                                <TERipple rippleColor="light" className="flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-block w-80 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        onClick={() => toggleShow1(index)}
                                    >
                                        Packet {Struct1.length - index}
                                    </button>
                                </TERipple>

                                <TECollapse show={show1[index]}>
                                    <div
                                        className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 dark:text-neutral-50">

                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                                    <div className="overflow-hidden">
                                                        <table className="min-w-full text-center text-sm font-light">
                                                            <thead
                                                                className="border-b font-medium dark:border-neutral-500">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-4">KEY</th>
                                                                <th scope="col" className="px-6 py-4">VALUE</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr
                                                                className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    ID
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.ID}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    SRC
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.SRC}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-success-200 bg-success-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    DST
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.DST}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    MAG
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.MAG}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    TS
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.TS}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-info-200 bg-info-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    TYPE
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.TYPE}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    TARGET
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.TARGET}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    MV_BGT
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.MV_BGT}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-success-200 bg-success-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    RESULT
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.RESULT}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    MAGS
                                                                </td>
                                                                <td className="whitespace-pre-wrap px-6 py-4">
                                                                    <table className="flex justify-center">
                                                                        <tbody>
                                                                        <tr>
                                                                            <td>{item.DATA.MAGS[0]}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>{item.DATA.MAGS[1]}</td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TECollapse>
                            </div>
                        )
                            ;
                    })}
                </TETabsPane>
                <TETabsPane show={basicActive === "tab3"}>
                    <div className="flex justify-center text-red-500 font-bold">Buffer 2</div>
                    {Struct2.slice(0, 10).map((item, index) => { // Mostra solo i primi 10 elementi
                        const key = Object.keys(item)[0];
                        const values = item[key];
                        return (
                            <div key={index} className="my-4">
                                <TERipple rippleColor="light" className="flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-block w-80 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        onClick={() => toggleShow2(index)}
                                    >
                                        Packet {Struct2.length - index}
                                    </button>
                                </TERipple>

                                <TECollapse show={show2[index]}>
                                    <div
                                        className="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 dark:text-neutral-50">

                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                                    <div className="overflow-hidden">
                                                        <table className="min-w-full text-center text-sm font-light">
                                                            <thead
                                                                className="border-b font-medium dark:border-neutral-500">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-4">KEY</th>
                                                                <th scope="col" className="px-6 py-4">VALUE</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr
                                                                className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    ID
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.ID}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    SRC
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.SRC}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-success-200 bg-success-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    DST
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.DST}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    MAG
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.MAG}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    TS
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.TS}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-info-200 bg-info-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    TYPE
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.BASE.TYPE}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    MEM_TS
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.MEM_TS}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    FAILURE
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.FAILURE}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-success-200 bg-success-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    EEPROM
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.EEPROM}</td>
                                                            </tr>
                                                            <tr
                                                                className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    SV
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{item.DATA.SV}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TECollapse>
                            </div>
                        )
                            ;
                    })}
                </TETabsPane>
            </TETabsContent>
        </div>
    )
}
