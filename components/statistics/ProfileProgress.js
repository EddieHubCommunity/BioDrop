import React from 'react'

const ProfileProgress = ({ progress }) => {
    return (
        <div className='w-full border p-4 my-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>Profile Completion: <span className='text-indigo-600'>{progress.percentage} %</span></h3>


            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                <div class="bg-indigo-600 h-2.5 my-4 rounded-full" style={{ "width": `${progress.percentage}%` }}></div>
            </div>
        </div>
    )
}

export default ProfileProgress