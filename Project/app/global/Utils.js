/**
 * Yonis Larsson (yonis.larsson.biz@gmail.com)
 * April 9th, 2016
 */
'use strict';

var getMostRecentBracketItem = function(brackets) {
    // assuming that the most recent bracket would be arranged at 1st position.
    return 0;
};


/*
 The Rule of evaluating Bracket's STEPS - ORDER, SHIPMENT, INVOICE & PAYMENT.

 ORDER: Both accords (Contract and Shipment) should be complete, and Send Contract and Accept Contract should be complete.
Once those are all complete, ORDER is complete.

 SHIPMENT: To complete, SHIPMENT, the seller must complete the Ship Goods clause. Once they ship the goods,
 they upload the logistics document (Bill of Lading, etc.), and SHIPMENT is complete.

 INVOICE: This section starts when SHIPMENT is complete, with the seller uploading the Commercial Invoice.
 The next step is for QC to be performed. I do not think an example of that currently exists in any of the samples,
 but it would be an event (I can provide a sample if still not clear). The idea is, the QC person sees the original invoice,
 checks the quality of the goods and applies possible discounts, then uploads the modified, final invoice.
 The buyer then approves the final invoice, completing the INVOICE section (in the bracket, this is the Accept Shipment clause).

 PAYMENT: This would be the final clause, the MAKE PAYMENT clause.
 In the current model, all the buyer should have to do is click a button to confirm
 that payment has been made (the payment itself does not happen through our system).
 Don't worry about the Receive Payment clause - this is something that will happen as well,
 but should not affect the completion of PAYMENT.
 */

var isComplete = function (state) {
    return state === 'complete';
};

/**
 * This function will be called to evaluate a bracket in terms of progress based on certain step.
 * @param bracket   one element of BracketSamples
 * @param step      one of 'ORDER', 'SHIPMENT', 'INVOICE' and 'PAYMENT'
 * @returns {number}    0: incomplete, 1: in progress, 2: complete
 */
var getStatus = function(bracket, step) {
    // calculate the status according to step based on bracket
    let complete = 2, waiting = 1, incomplete = 0;
    var prevStatus;
    var isContract = "", isShipment = "";
    var accords = bracket["accords"];
    var i;
    for (i = 0; i < accords.length; i++) {
        if (isContract === "" && accords[i]["label"] === `Contract`)
            isContract = accords[i]["state"];
        if (isShipment === "" && accords[i]["label"] === `Shipment`)
            isShipment = accords[i]["state"];
    }

    var clauses = bracket["clauses"];
    var isSendContract = "", isAcceptContract = "", isShipGoods = "", isAcceptShipment = "", isMakePayment = "";
    for (i = 0; i < clauses.length; i++) {
        if (isSendContract === "" && clauses[i]["label"] === 'Send Contract')
            isSendContract = clauses[i]["state"];
        if (isAcceptContract === "" && clauses[i]["label"] === 'Accept Contract')
            isAcceptContract = clauses[i]["state"];
        if (isShipGoods === "" && clauses[i]["label"] === 'Ship Goods')
            isShipGoods = clauses[i]["state"];
        if (isAcceptShipment === "" && clauses[i]["label"] === 'Accept Shipment')
            isAcceptShipment = clauses[i]["state"];
        if (isMakePayment === "" && clauses[i]["label"] === 'Make Payment')
            isMakePayment = clauses[i]["state"];
    }

    switch (step) {
        case 'ORDER':
            if (isComplete(isContract) && isComplete(isShipment) && isComplete(isSendContract) && isComplete(isAcceptContract))
                return complete;
            break;
        case 'SHIPMENT':
            prevStatus = getStatus(bracket, 'ORDER');
            if (prevStatus != complete)
                return incomplete;

            if (isComplete(isShipGoods))
                return complete;

            break;
        case 'INVOICE':
            prevStatus = getStatus(bracket, 'SHIPMENT');
            if (prevStatus != complete)
                return incomplete;

            if (isComplete(isAcceptShipment))
                return complete;

            break;
        case 'PAYMENT':
            prevStatus = getStatus(bracket, 'INVOICE');
            if (prevStatus != complete)
                return incomplete;

            if (isComplete(isMakePayment))
                return complete;
            break;
    }

    return waiting;
};

/**
 * The meanings of parameters are same to above.
 * @param bracket
 * @param step      important: step can be empty string('') which means needing to get string for last in-progress step.
 * @returns {string}
 */
var getDescription = function(bracket, step) {
    return 'DESCRIPTION';
};

var getElementString = function(bracket, step, elementNo) {
    return step + elementNo + ': DESCRIPTION';
};

module.exports = {
    getMostRecentBracketItem: getMostRecentBracketItem,
    getStatus: getStatus,
    getDescription: getDescription,
    getElementString: getElementString
};
