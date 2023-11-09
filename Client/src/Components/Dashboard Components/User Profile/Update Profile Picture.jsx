import React from 'react'; // This is installed with react by default.

// Import Variables
import { LocalUserPicUpload } from '@app/App_Config'; // import the anonymous user logo

// This is the component that will be used to update the user's profile picture
import { Heading } from '@chakra-ui/react'; // import the heading component from chakra ui
import { Button } from '@chakra-ui/react'; // import the button component from chakra ui

// Import API Call
import { API } from '../../../Helper/Common'; // import the api call function

// icons
import {FaUpload} from 'react-icons/fa'; // import the upload icon

export default function UpdateProfilePicture() {
	// States
	const [isLoading, setIsLoading] = React.useState(false); // set the loading state to false
	const [profilePicture, setProfilePicture] = React.useState(null); // set the profile picture state to null

	// Function to update the user's profile picture
	const Handler = event => {
		setProfilePicture(event.target.files[0]);
		console.log(profilePicture);
	};

    // Create Submit Handler
    const SubmitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('profilePicture', profilePicture)
        const res = await API.FormDataPut('/user/update-profile-picture', formData)
		console.log(res)
        setIsLoading(false)
    }

	return (
		<div className="my-5">
			<>
				<div className="w-full ml-10  max-w-[25rem] mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div className="py-10 px-10 justify-between items-center flex">
						<Heading size="sm" className="text-center font-bold">
							{' '}
							Update Profile Picture{' '}
						</Heading>
						<div className="avatar lg:block hidden">
							<div
								className="w-28 p-2 hover:bg-gray-100 rounded-lg  cursor-pointer"
								onClick={e => {
									e.preventDefault();
									document.querySelector('.file-input').click();
								}}>
								<img src={profilePicture !== null ? URL.createObjectURL(profilePicture) : LocalUserPicUpload} />
							</div>
							<input
								type="file"
								name="profilePicture"
								accept="image/jpeg, image/png , image/jpg, image/webp"
								size={1 * 1024 * 1024}
								onChange={Handler}
								encType="multipart/form-data"
								placeholder="Upload Profile Picture"
								className="hidden file-input"
							/>
						</div>
					</div>
					<Button onClick={SubmitHandler} isLoading={isLoading} leftIcon={<FaUpload />} rightIcon={<FaUpload />} colorScheme="pink" variant="solid" className='w-full'>
						Upload Now
					</Button>
				</div>
			</>
		</div>
	);
}
