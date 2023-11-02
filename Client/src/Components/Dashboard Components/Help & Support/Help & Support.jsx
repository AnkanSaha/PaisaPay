import React from "react"; // import react
import { useSelector } from "react-redux"; // import the use selector hook from react redux
import moment from "moment"; // import moment for date formatting

// Import Functions
import { Cryptography, API } from "@helper/Common"; // import the common functions

// import Components & Pages
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react"; // import the chakra ui components

// Import Components & Pages
import { LoadingScreen } from "@page/Common Pages/Loading Screen"; // import the loading screen

export default function HelpAndSupport() {
  // Hooks
  const ReduxState = useSelector((state) => state); // get the redux state
  const toast = useToast(); // get the toast component from chakra ui
  // States
  const [loading, setLoading] = React.useState(true); // set the loading state to true
  const [tickets, setTickets] = React.useState([]); // set the tickets state to an empty array

  // Use Effects
  React.useEffect(() => {
    setLoading(true); // set the loading state to true
    const DecryptAccountData = JSON.parse(
      Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)
    ); // decrypt the account data
    API.Get(
      `/get/help/GetAllSupportHistory?sessionID=${ReduxState.AccountInfo.sessionID}&Email=${DecryptAccountData.Email}&PhoneNumber=${DecryptAccountData.PhoneNumber}`
    ).then((response) => {
      setLoading(false); // set the loading state to false
      if (response.statusCode !== 200) {
        toast({
          title: response.Title,
          description: response.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      setTickets(JSON.parse(Cryptography.DecryptSync(response.data))); // set the tickets state to the response data
    });
  }, []); // use effect to run on component mount
  return (
    <>
      {loading === true ? (
        <LoadingScreen StatusText=" Loading All Tickets that you have created" />
      ) : (
        <>
          <Heading className="text-center text-cyan-700 mt-7" size="lg">
            Help & Support Section (Client Only) - View Tickets
          </Heading>
          <div className="mt-10 mx-5">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {tickets.map((ticket, index) => {
                return (
                  <>
                    <Tooltip
                      label={
                        ticket.AdminResponse === "No response yet"
                          ? " No Response from Admin"
                          : ticket.AdminResponse
                      }
                      aria-label="A tooltip"
                      placement="top"
                      key={index}
                    >
                      <Card
                        bgColor={
                          ticket.TicketStatus === "Pending"
                            ? "yellow.500"
                            : ticket.TicketStatus === "In Progress"
                            ? "blue.500"
                            : ticket.TicketStatus === "Resolved"
                            ? "green.500"
                            : "red.500"
                        }
                      >
                        <CardHeader>
                          <Heading size="md">
                            {" "}
                            {JSON.parse(
                              Cryptography.DecryptSync(ticket.TicketTitle)
                            )}
                          </Heading>
                        </CardHeader>
                        <CardBody>
                          <Text>
                            Registered :{" "}
                            {moment(ticket.RequestDate).format(
                              "DD-MM-YY HH:mm:ss A"
                            )}{" "}
                            <br />
                          </Text>
                          <br />
                          <Text>
                            <p className="font-bold">Description : </p>
                            {JSON.parse(
                              Cryptography.DecryptSync(ticket.TicketDescription)
                            )}{" "}
                            <br />
                          </Text>
                        </CardBody>
                      </Card>
                    </Tooltip>
                  </>
                );
              })}
            </SimpleGrid>
          </div>
        </>
      )}
    </>
  ); // return the help and support page
}
