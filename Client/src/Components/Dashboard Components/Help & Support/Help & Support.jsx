import React from "react"; // import react

// import Components & Pages
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react"; // import the chakra ui components

export default function HelpAndSupport() {
  return (
    <>
      <Heading className="text-center text-cyan-700 mt-7" size="lg">
        Help & Support Section (Client Only) - Create / View Tickets
      </Heading>
      <div className="mt-10 mx-5">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <Card>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View  Reply to Tickets</Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </div>
    </>
  ); // return the help and support page
}
