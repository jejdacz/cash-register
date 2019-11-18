module.exports = (price, cash, cid) => {
  const cidPenny = cid.map(e => [e[0], parseInt(e[1] * 100)]);
  const totalPenny = cidPenny.reduce((t, u) => t + u[1], 0);

  const reminderPenny = parseInt(cash * 100) - parseInt(price * 100);
  const unitsPenny = [
    ["PENNY", 1],
    ["NICKEL", 5],
    ["DIME", 10],
    ["QUARTER", 25],
    ["ONE", 100],
    ["FIVE", 500],
    ["TEN", 1000],
    ["TWENTY", 2000],
    ["ONE HUNDRED", 10000]
  ];

  const processChange = (reminder, cid, units) => {
    units = units.reverse();
    cid = cid.reverse();
    const change = [];

    units.forEach((u, i) => {
      // copy unit name
      change.push([u[0], 0.0]);
      //change[i] = [u[0], 0.0];
      // is greater than unit
      while (reminder >= u[1] && cid[i][1] >= u[1]) {
        // move amount
        reminder -= u[1];
        cid[i][1] -= u[1];
        change[i][1] += u[1];
      }
    });
    console.log({ price, cash, reminder, change, cid });
    return [reminder, cid, change];
  };

  const formatChange = change =>
    change.filter(e => e[1] > 0).map(e => [e[0], e[1] / 100]);

  // is total less than reminder
  if (totalPenny < reminderPenny) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // process change
  const result = processChange(reminderPenny, cidPenny, unitsPenny);

  if (result[0] > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (result[0] === 0) {
    if (result[1].filter(e => e[1] > 0).length === 0) {
      return { status: "CLOSED", change: cid };
    } else {
      return { status: "OPEN", change: formatChange(result[2]) };
    }
  } else {
    throw new Error("Unexpected result");
  }
};
