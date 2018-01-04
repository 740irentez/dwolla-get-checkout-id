var request = require('request');

var production = false;

//function callback (er, bd) {
//  console.log(er, bd);
//}

function postResponse (error, res, body) {
    if (error) console.log('ERROR: ', error);
    else  console.log('SUCCESS');
  
    //res.writeHead(301, {
    //  Location: 'https://uat.dwolla.com/payment/checkout/' + body.CheckoutId
    //});    
    //res.end();
    callback(error, body);
}

return function (context, callback) {
  console.log('Sending new message to bot... ');
  
  var destinationId;
  var url;
  var client_id;
  var client_secret;
  
  if (production === true) {
    destinationId = '8128397947';
    //destinationId = '812-839-7947';
    //destinationId = 8128397947;
    
    url = 'https://www.dwolla.com/payment/request';
    client_id = 'NSU22hMNAGkXH2EYhzXyNs79l2shmG5xF5dqrAzJi6GyV6EmPt';
    client_secret = 'i1yZrjd3KT1Qjrd9FqeM9kT6UvwPCx0SbIV9vC6owCqrZCOLcq';
  } else { //sandbox
    destinationId = '8127418252';
    //destinationId = '812-741-8252';
    //url = 'https://uat.dwolla.com/payment/request';
    url = 'https://sandbox.dwolla.com/payment/request';
    //url = 'https://api-sandbox.dwolla.com/payment/request';
	
    client_id = 'ExMSSngBJDkF9sp4Wjlu1OL4uPnR2Q7eMNHdFfQIriGYNmhS8p';
    client_secret = '3xelP0cXIxjOSezm0GTEarExukwk6oSaH5kT6xaITOb0AsGfv3';
  }

  var checkout = {
      orderId : 1,
      purchaseOrder :  {
      destinationId : destinationId,
      total : '11.26'
    }
  };
  
  var checkoutStringified = JSON.stringify(checkout);
  
	//var url = 'https://api-sandbox.dwolla.com/payment/request';
	
  //var url = 'https://api-sandbox.dwolla.com/oauth/rest/offsitegateway/checkout';

  var payload = {
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'//;charset=utf-8'
    },
    json: true,
    body: {
      Key : client_id,
//      client_id: client_id,
//      client_secret: client_secret,
      Secret : client_secret,
      callback : "https://wt-4be0c38760dbec5e388b02b801f4a631-0.run.webtask.io/hello",
      redirect : "https://wt-4be0c38760dbec5e388b02b801f4a631-0.run.webtask.io/hello",
      purchaseOrder : checkout,
      allowGuestCheckout : "true",
      allowFundingSources : "true",
      orderId : checkout.orderId
    }
  };

  request(payload, postResponse);
};