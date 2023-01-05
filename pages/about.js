import React from 'react'
import Head from 'next/head'
import jsCookie from 'js-cookie'
import { parseCookies } from 'nookies'

const about = () => {

    // const { token } = parseCookies()
    // console.log(token)

    return (

        <div>

            <Head>
                <title>Squiggiy - About</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {/* <img src="/openshop.jpeg" alt="" className='w-full h-screen bg-cover bg-no-repeat absolute top-32 xxxs:top-28 xs:top-9 left-0 z-0 blur-xs' /> */}

            <div className="relative z-10">

                <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                    <div className="flex ">
                        <div className="w-full flex flex-col justify-center">
                            <h1 className="text-lg md:text-xl lg:text-2xl font-bold leading-9 text-black pb-4">About Us</h1>
                            <p className="font-normal text-base leading-6 text-gray-600 ">We are Squiggiy family. We try to easy your daily life. Where your can spend your busy life in safe. We provide your daily based products like dairy, vegetables, grocery etc from your surrounding market. You can get easy and quick delivary survice. And quality of your product not be compromised as our terms of conditions has. For any query your can contact that product Seller or Us. You can full fill your needs by useing our survice by safe and secure.</p>
                        </div>
                    </div>

                    <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                        <div className="w-full justify-center">
                            <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-9 text-black pb-4">Trems and Conditions</h1>
                            <p className="font-normal text-sm sm:text-base leading-6 text-gray-800 ">

                                These terms and conditions outline the rules and regulations for the use of Squiggiy&apos;s Website, located at www.Squiggiy.com. By accessing this website we assume you accept these terms and conditions. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same. Do not continue to use Squiggiy.com if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of Netherlands.

                            </p>


                            <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-9 text-black pb-4 mt-5">Cookies</h1>
                            <p className="font-normal text-sm sm:text-base leading-6 text-gray-800 ">

                                We employ the use of cookies. By accessing Squiggiy.com, you agreed to use cookies in agreement with the Squiggiy&apos;s Privacy Policy. Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.

                            </p>

                            <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-9 text-black pb-4 mt-5">Orders</h1>
                            <p className="font-normal text-sm sm:text-base leading-6 text-gray-800 ">

                                We will try our best to confirm 100% of the orders but in an uncertain event if we are being not able to fulfil the order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
                                In case the order is cancelled, 100% refund will be issued to the customer We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                                We shall not be liable for delay or failure to perform our obligations under these Terms if such delay or failure is due to any cause or conditions beyond our reasonable anticipation or control
                                Such causes or conditions shall include, without limitation, acts of God or of the public enemy, acts of any government or any authority or public body thereof in either their sovereign or contractual capacity, strikes, refusal or inability of a common carrier to provide communications capabilities (for example, but not limited to, internet services, email services, telephone and messaging services), shortages of labour, energy or materials, freight embargoes, delays in transportation, unusually severe weather, earthquake, flood, fire, notified epidemic resulting in lockdown of the area of Our offices, or resulting in the closure of our office(s) whether by the order of the authorities or as a matter of abundant caution on our part, valid court order, or any delay or failure to perform by any supplier or sub-contractor resulting from any of the above or other circumstances beyond our reasonable control and against which we could not reasonably have protected ourselves, such events constituting a condition of Force Majeure. We will attempt to notify you, on best-effort basis, at the earliest practicable time, identifying the Force Majeure event, the date of its occurrence and the tentative date up to which the Force Majeure event is expected to continue; however, such notification is not a necessary pre-condition to the event being identifiable as a Force Majeure event and the tentative date is not an assurance or binding on us, and is provided only as a goodwill gesture.
                                Our obligations under these Terms shall cease for the period of Force Majeure, and shall resume on the date such Force Majeure event actually ends, whether or not this is the same as the tentative date.

                            </p>


                            <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-9 text-black pb-4 mt-5">License</h1>
                            <p className="font-normal text-sm sm:text-base leading-6 text-gray-800 ">

                                Unless otherwise stated, Squiggiy and/or its licensors own the intellectual property rights for all material on Squiggiy.com. All intellectual property rights are reserved. You may access this from Squiggiy.com for your own personal use subjected to restrictions set in these terms and conditions.

                                <span className="font-normal pb-2 mt-2 block"> You must not:</span>

                                Republish material from Squiggiy.com
                                Sell, rent or sub-license material from Squiggiy.com
                                Reproduce, duplicate or copy material from Squiggiy.com
                                Redistribute content from Squiggiy.com
                                This Agreement shall begin on the date hereof.
                                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Squiggiy does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Squiggiy,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Squiggiy shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website. Squiggiy reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

                            </p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default about

