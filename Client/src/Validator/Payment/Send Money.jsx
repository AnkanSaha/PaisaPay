// This Function for the Send Money Section validates the input fields and sends the data to the server

export default InputData => {
  // Payment Id Must have @pp or @PP at the end
  const PaymentIDRegex = /^.*@pp$|^.*@PP$/ // This is for Payment ID

  if (InputData.ReceivingPaymentID === '' || InputData.ReceivingPaymentID === undefined || InputData.ReceivingPaymentID === null) {
    return {
      status: false,
      title: 'Error, Receiving Payment ID',
      message: 'Please enter the receiving payment id'
    }
  } else if (InputData.TransactionAmount === '' || InputData.TransactionAmount === undefined || InputData.TransactionAmount === null) {
    return {
      status: false,
      title: 'Error, Transaction Amount',
      message: 'Please enter the transaction amount'
    }
  } else if (PaymentIDRegex.test(InputData.ReceivingPaymentID) === false) {
    return {
      status: false,
      message: 'Please Enter a Valid Payment ID, It is Required for Registration',
      title: 'Error, Payment ID'
    }
  } else if (InputData.SendingPaymentID === InputData.ReceivingPaymentID) {
    return {
      status: false,
      title: 'Cannot Send Money to Yourself',
      message: 'You cannot send money to yourself, Please enter a different payment id'
    }
  } else if (InputData.TransactionPIN === '' || InputData.TransactionPIN === undefined || InputData.TransactionPIN === null) {
    return {
      status: false,
      title: 'Error, Transaction PIN',
      message: 'Please enter the transaction pin to continue'
    }
  }
  return {
    status: true,
    title: 'Validation Successful',
    message: 'Validation Successful for Send Money, Sending Data to the Server'
  }
}
