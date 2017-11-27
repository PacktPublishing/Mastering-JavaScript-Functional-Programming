const nextMonday = () => {
    let d = new Date();
  	do {
  	    d.setDate(d.getDate()+1);
    } while (d.getDay()!==1);
	  return d;
};

const nextMonday2 = (d) => {
	do {
      	d.setDate(d.getDate()+1);
    } while (d.getDay()!==1);
	return d;
};

const nextMonday3 = (d) => {
    let aux = new Date(d.getYear(), d.getMonth(), d.getDate());
	do {
      	aux.setDate(aux.getDate()+1);
    } while (aux.getDay()!==1);
	return aux;
};


console.log(nextMonday());   // Mon Jun 12 2017 14:40:25 GMT+0530 (IST)
console.log(nextMonday());   // Mon Jun 12 2017 14:40:25 GMT+0530 (IST)
console.log(nextMonday());   // Mon Jun 12 2017 14:40:25 GMT+0530 (IST)

var y = new Date();
console.log(y);              // Sat Jun 10 2017 14:40:25 GMT+0530 (IST)
console.log(nextMonday2(y)); // Mon Jun 12 2017 14:40:25 GMT+0530 (IST)
console.log(nextMonday2(y)); // Mon Jun 19 2017 14:40:25 GMT+0530 (IST)
console.log(nextMonday2(y)); // Mon Jun 26 2017 14:40:25 GMT+0530 (IST)
console.log(y);              // Mon Jun 26 2017 14:40:25 GMT+0530 (IST)

var z = new Date();
console.log(z);              // Sat Jun 10 2017 14:40:25 GMT+0530 (IST)
console.log(nextMonday3(z)); // Mon Jun 14  117 00:00:00 GMT+0530 (IST)
console.log(nextMonday3(z)); // Mon Jun 14  117 00:00:00 GMT+0530 (IST)
console.log(nextMonday3(z)); // Mon Jun 14  117 00:00:00 GMT+0530 (IST)
console.log(z);              // Sat Jun 10 2017 14:40:25 GMT+0530 (IST)