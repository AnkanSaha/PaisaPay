import React from "react"; // import react
import {useSelector} from "react-redux"; // import react-redux
import {Cryptography} from '@helper/Common'; // import the crypto function
import moment from "moment"; // import moment

// Import Components
import {
  Box,
  Heading,
  Stack,
  StackDivider,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react"; // import chakra ui components

export default function ProfileDetails() {
  // Hooks
  const ReduxState = useSelector((state) => state); // get redux state
  
  const Decrypted_Data = JSON.parse(Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)); // decrypt the data
  
  return (
    <>
    <div className="absolute right-[3rem] w-[62%] top-[7rem] pb-20">
      <Card>
        <CardHeader>
          <Heading className="text-center" size="lg">Client Details</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Account Number
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.ClientID}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Account Holder Name
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.Name}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Account Type
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.AccountType}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Account Status
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.AccountStatus}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Date of Birth
              </Heading>
              <Text pt="2" fontSize="sm">
                {moment(Decrypted_Data.DOB).format("DD/MM/YYYY")}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Email Address (Primary)
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.Email}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Phone Number (Primary)
              </Heading>
              <Text pt="2" fontSize="sm">
              +91 {Decrypted_Data.PhoneNumber}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                National ID Type
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.National_ID_Type}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
               Last Four Digit of National ID Number
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.LastFourDigitsOfIDNumber}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
               Last Login IP Address
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.LastLoginIP} ({Decrypted_Data.LastLoginClientDetails.IP_Type})
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
               Last Login Time
              </Heading>
              <Text pt="2" fontSize="sm">
                {moment(Decrypted_Data.LastLoginTime).format("DD/MM/YYYY HH:mm:ss A")}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
               Last Login Browser Name
              </Heading>
              <Text pt="2" fontSize="sm">
                {Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.BrowserDetails.BrowserName} (v{Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.BrowserDetails.BrowserVersion})
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
               Last Login Device
              </Heading>
              <Text pt="2" fontSize="sm">
                
                {Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.Device_Details.DeviceType} ({Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.Device_Details.DevicePlatform} / {Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.Device_Details.DeviceCPU} Core)
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      </div>
    </>
  );
}
