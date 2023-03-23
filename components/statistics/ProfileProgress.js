import React from 'react'
import {
    MdOutlinePlayArrow,
    MdHelpOutline,
    MdOutlineLink,
    MdOutlinePersonPin,
    MdOutlineAutoGraph,
    MdOutlineEditCalendar,
} from "react-icons/md";

const ProfileProgress = ({ progress }) => {
    return (
        <div className='w-full border p-4 my-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>Profile Completion: <span className='text-indigo-600'>{progress.percentage} %</span></h3>


            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div class="bg-indigo-600 h-2.5 my-4 rounded-full" style={{ "width": `${progress.percentage}%` }}></div>
            </div>

            <div className="border p-4 my-4 gap-4 flex items-center justify-start">
                <MdHelpOutline className="h-8 w-8 text-indigo-600"
                    aria-hidden="true" />
                <h3>Add social icons to your profile</h3>
            </div>
            <div className="flex justify-between p-2">
                <div className="flex gap-2">
                    <button className='text-gray-900 text-lg flex gap-1 justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Prev
                    </button>
                    <button className='text-gray-900 text-lg flex gap-1 justify-center items-center'>
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <button className='bg-indigo-600 text-white py-2 px-4 rounded-lg' >Learn More</button>
            </div>
        </div>
    )
}

export default ProfileProgress