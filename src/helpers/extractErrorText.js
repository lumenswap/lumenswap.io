export default function extractErrorText(error) {
  if (error?.response?.data?.extras?.result_codes?.operations) {
    const code = error.response.data.extras.result_codes.operations[1]
      ? error.response.data.extras.result_codes.operations[1]
      : error.response.data.extras.result_codes.operations[0];

    if (code === 'op_under_dest_min') {
      return 'Your order is too large to be processed by the network. Do you want to register it as an active order on the network?';
    }
    if (code === 'op_underfunded') {
      return 'You have not enough funds to send and still satisfy selling liabilities, Note that if sending XLM then the you must additionally maintain its minimum XLM reserve.';
    }
    return `There is some issue in your transaction. reason: ${code}`;
  }

  if (error.message) {
    return error.message;
  }

  return 'There is some issue in your transaction.';
}
