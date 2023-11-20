import React from 'react'; // Import React

// Import Components form Chakra UI
import {
Heading,
InputGroup,
Input,
InputRightElement,
Button,
} from '@chakra-ui/react'; // import From Chakra UI

export default function UpdatePaymentID() {
    // States
	const [show, setShow] = React.useState(false); // set the show state to false
    const [loading, setLoading] = React.useState(false); // set the loading state to false
    const [NewpaymentIDinfo, setNewpaymentIDinfo] = React.useState({
        NewPaymentID: '',
        TPIN: ''
    }); // set the New paymentIDinfo state to null

    // Functions
	const handleClick = () => setShow(!show); // set the show state to the opposite of what it is
    const handleChange = event => {
        setNewpaymentIDinfo({ ...NewpaymentIDinfo, [event.target.name]: event.target.value }); // set the New paymentIDinfo state to the value of the input field
    } // set the New paymentIDinfo state to the value of the input field
    const handleUpdatePaymentID = async ()=>{
        setLoading(true); // Update loading State to True
    }
  return (
    <div className="my-5">
    <>
        <div className="w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-6 py-5">
                <Heading size="lg">Change Payment ID </Heading>
                <InputGroup size="md">
                    <Input pr="4.5rem" onClick={handleChange} value={NewpaymentIDinfo.NewPaymentID} type={show ? 'text' : 'password'} placeholder="Enter New Payment ID" name="NewPaymentID" ></Input>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide': 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size="md">
                    <Input pr="4.5rem" onClick={handleChange} value={NewpaymentIDinfo.TPIN} type={show ? 'text' : 'password'} placeholder="Enter Current PIN" name="TPIN" />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide': 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                
            </div>
            <Button isLoading={loading} className="w-full mb-5" colorScheme="blue" onClick={handleUpdatePaymentID}>
                Update Payment ID
            </Button>
        </div>
    </>
</div>
  );
}