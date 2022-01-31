const response = {
  status: 'success',
};

function sendProposal(data) {
  return new Promise((reslove) => setTimeout(reslove, 2000)).then(() => (
    response
  ));
}

export default sendProposal;
