export default async function HelpCenterDataValidator (Data) {
  if (Data.TicketTitle === undefined || Data.TicketTitle === null || Data.TicketTitle === '') {
    return {
      status: false,
      Title: 'Please enter a title for your ticket',
      Description: 'Please enter a description for your ticket, so we can help you better'
    }
  } else if (Data.TicketDescription === undefined || Data.TicketDescription === null || Data.TicketDescription === '') {
    return {
      status: false,
      Title: 'Please enter a description for your ticket',
      Description: 'Please enter a description for your ticket, so we can help you better'
    }
  } else {
    return {
      status: true,
      Title: '',
      Description: ''
    }
  }
}
